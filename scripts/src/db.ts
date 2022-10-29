import { Client, Pool, PoolClient } from 'pg';
import { IUSFMParsedObject, IVerse, IChapter, ChapterContent, OtherElement } from 'usfm-grammar';
import { INSERT_QUERY_TEMPLATE } from './query.template';

interface ICollectionParameters {
  languageIndex: string;
  languageId: number;
  collectionName: string;
}
interface IInsertParameters extends ICollectionParameters {
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  word: string;
  wordNumber: number;
  meta: object;
}

function realWordsOnly(str: string) {
  return str.split(/[^\w’]/)
    .filter(substr => substr.match(/[\w’]/));
}

function parsedFileToChapters(data: IUSFMParsedObject): IChapter[] {
  return data.chapters;
}

function chaptersToVerses(chapters: IChapter[]): (IVerse & { chapterNumber: number })[] {
  return chapters.flatMap(chapter => {
    const { chapterNumber, contents } = chapter;

    return contents.filter(content => {
      return content
        && typeof content === 'object'
        && 'verseNumber' in content;
    })
      .map(content => content as IVerse)
      .map(verse => {
        return {
          ...verse,
          chapterNumber
        }
      });
  });
}

interface INormalContent {
  word: string;
  meta: { type: string }
}
function normalizeContent(content: OtherElement): INormalContent[] {
  if (content === null) {
    return [] as INormalContent[];
  } else if (typeof content === 'string') {
    return [{ word: content as string, meta: { type: "puncutation" } }]
  } else if (typeof content === 'object' && 'items' in content) {
    const o: { items: OtherElement[] } = content as any;
    return o.items.flatMap(normalizeContent);
  } else if (typeof content === 'object' && 'w' in content) {
    const o: { w: string[], attributes: object[] } = content as any;

    return o.w.flatMap(ws => {
      return realWordsOnly(ws).map(word => {
        return {
          word,
          meta: {
            type: "word",
            ...o.attributes.reduce((acc, o) => ({ ...acc, ...o }), {})
          }
        }
      });
    });
  } else if (typeof content === 'object' && 'add' in content) {
    const o: { add: string[] } = content as any;

    return o.add.flatMap(ws => {
      return realWordsOnly(ws).map(word => {
        return {
          word,
          meta: {
            type: "addition"
          }
        }
      });
    });
  }

  return [] as INormalContent[];
}

function versesToContents(verses: (IVerse & { chapterNumber: number })[]): (INormalContent & { verseNumber: number, chapterNumber: number})[] {
  return verses.flatMap(verse => {
    const { verseNumber, chapterNumber } = verse;

    if (verse.contents) {
      return verse.contents.flatMap(normalizeContent)
          .map((normalContent: INormalContent) => {
          return {
            ...normalContent,
            verseNumber: parseInt(verseNumber),
            chapterNumber
          }
        });
    } else {
      return [];
    }
  });
}

export function getInsertParameters(collection: ICollectionParameters, data: IUSFMParsedObject): IInsertParameters[] {
  const { languageIndex, languageId, collectionName } = collection;
  const bookName = data.book.bookCode;

  const chapters = parsedFileToChapters(data);
  const verses = chaptersToVerses(chapters);
  const contents = versesToContents(verses);

  return contents.map((content, wordNumber) => {
    return {
        ...content,
        word: content.word,
        meta: content.meta,
      wordNumber,
      bookName,
      languageIndex,
      languageId,
      collectionName
    };
  });
}

export async function insertWord(client: Client | Pool | PoolClient, params: IInsertParameters) {
  const query = {
    text: INSERT_QUERY_TEMPLATE,
    values: [
      params.languageIndex,
      params.languageId,
      params.collectionName,
      params.bookName,
      params.chapterNumber,
      params.verseNumber,
      params.word,
      params.wordNumber,
      params.meta
    ]
  };

  return await client.query(query);
}
