import { Client, Pool, PoolClient } from 'pg';
import { IDocument, IVerse, IChapter } from './parser';
import { INSERT_QUERY_TEMPLATE } from './query.template';

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

function parsedFileToChapters(data: IDocument): IChapter[] {
  return data.chapters;
}

type VerseWithChapterNumber = IVerse & { chapterNumber: number };
function chaptersToVerses(chapters: IChapter[]): VerseWithChapterNumber[] {
  return chapters.flatMap(chapter => {
    const { chapterNumber } = chapter;

    return chapter.verses.map(v => ({
      ...v,
      chapterNumber
    }));
  });
}

interface IContent {
  chapterNumber: number,
  verseNumber: number,
  wordNumber: number
  word: string,
  meta: object
};

type ScopePayload = object | string;
type Scope = ScopePayload[];

function scopePayloadToObject(payload: string): ScopePayload {
  function assocIn(kvs: string[]): object | string {
    if(kvs.length === 1) {
      return kvs[0];
    }

    return {[kvs[0]]: assocIn(kvs.slice(1))};
  }

  return assocIn(payload.split('/'));
}

function scopeToMeta(scope: Scope): object {
  return scope.reduce((acc: object, el) => {
    if (typeof el === 'object') {
      return {...acc, ...(el as object)};
    } else {
      return acc;
    }
  }, {});
}

function versesToItems(verses: VerseWithChapterNumber[]): IContent[] {
  return verses.flatMap(verse => {
    const { verseNumber, chapterNumber } = verse;
    let content = [] as IContent[];
    let wordNumber = 0;
    let scope = [] as Scope;

    for (const item of verse.items) {
      if (item.type === 'scope' && item.subType === 'start') {
        const d = scopePayloadToObject(item.payload);
        scope = [d, ...scope];
      } else if (item.type === 'scope' && item.subType === 'end') {
        scope = scope.slice(1);
      } else if (item.type = 'token') {
        const d = {
          word: item.payload,
          meta: {...scopeToMeta(scope), proskommaData: item},
          verseNumber: parseInt(verseNumber),
          chapterNumber,
          wordNumber: ++wordNumber
        };
        content = [...content, d];
      }
    }

    return content;
  });
}

export function getInsertParameters(collection: ICollectionParameters, data: IDocument): IInsertParameters[] {
  const { languageIndex, languageId, collectionName } = collection;
  const bookName = data.title;

  const chapters = parsedFileToChapters(data);
  const verses = chaptersToVerses(chapters);
  const contents = versesToItems(verses);

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
