import { Client, Pool, PoolClient } from 'pg';
import { IDocument, IVerse, IChapter, IItem } from './parser';
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
function versesToItems(verses: VerseWithChapterNumber[]): IContent[] {
  return verses.flatMap(verse => {
    const { verseNumber, chapterNumber } = verse;

    return verse.items.map((item, wordNumber) => ({
      word: item.payload,
      meta: {},
      verseNumber: parseInt(verseNumber),
      chapterNumber,
      wordNumber
    }));
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
