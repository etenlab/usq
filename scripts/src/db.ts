import { Client, Pool, PoolClient } from 'pg';
import { IUSFMParsedObject, IVerse, IChapter, OtherElement } from 'usfm-grammar';
import { INSERT_QUERY_TEMPLATE } from './query.template';

import options from './options';

export interface ICollectionParameters {
  languageIndex: string;
  languageId: number;
  collectionName: string;
}
export interface IInsertParameters extends ICollectionParameters {
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  word: string;
  wordNumber: number;
  meta: object;
}

const WORD_REGEX = options.regexes.word;
const TOKEN_REGEX = options.regexes.token;

function tokenize(ws: string) {
  const arr = ws.match(TOKEN_REGEX);
  return arr ? arr : [];
}

function isPunctuation(word: string) {
  return !word.match(WORD_REGEX);
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

interface IMeta {
  type: string
}

interface INormalContent {
  word: string;
  meta: IMeta
}
function normalizeString(word: string, meta: IMeta = { type: "word" }): INormalContent {

  if (isPunctuation(word)) {
    return {
      word,
      meta: {
        type: "punctuation"
      }
    };
  } else {
    return {
      word,
      meta: meta
    };
  }

}

function normalizeContent(content: OtherElement, meta?: IMeta): INormalContent[] {
  if (content === null) {

    return [] as INormalContent[];

  } else if (typeof content === 'string') {

    return tokenize(content).map((w) => normalizeString(w, meta));

  } else if (typeof content === 'object' && 'items' in content) {

    const o: { items: OtherElement[] } = content as any;
    return o.items.flatMap((i) => normalizeContent(i));

  } else if (typeof content === 'object' && 'w' in content) {

    const o: { w: string[], attributes: object[] } = content as any;

    return o.w.flatMap(ws => {
      const meta: IMeta = {
        type: "word",
        ...o.attributes.reduce((acc, o) => ({ ...acc, ...o }), {})
      };

      return normalizeContent(ws, meta);
    });

  } else if (typeof content === 'object' && 'add' in content) {

    const o: { add: string[] } = content as any;

    return o.add.flatMap(ws => {
      const meta: IMeta = {
        type: "addition"
      };

      return normalizeContent(ws, meta);

    });
  }

  return [] as INormalContent[];
}

function versesToContents(verses: (IVerse & { chapterNumber: number })[]): (INormalContent & { verseNumber: number, chapterNumber: number })[] {
  return verses.flatMap(verse => {
    const { verseNumber, chapterNumber } = verse;

    if (verse.contents) {
      return verse.contents.flatMap((v) => normalizeContent(v))
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
