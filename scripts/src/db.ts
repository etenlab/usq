import * as grammar from 'usfm-grammar';

interface ISchema {
  schemaId: number;
  name: string;
  meta?: object;
};

interface ICollection {
  collectionId: number;
  languageIndex: string;
  languageId: number;
  name: string;
  meta?: object;
};

interface IBookIndex {
  indexId: number;
  name: string;
  meta?: object;
};

interface IVerse {
  verseId: number;
  verseNumber: number;
  meta?: object;
};

interface IChapter {
  chapterId: number;
  chapterNumber: number;
  meta?: object;

  verses: IVerse[];
};

interface IBook {
  bookId: number;
  collection: ICollection;
  bookIndex: IBookIndex;
  meta?: object;

  chapters: IChapter[];
};

interface IWordIndex {
  wordIndexId: number;
  languageIndex: string;
  languageId: string;
  word: string;
  meta?: object;
};

interface IWordReference {
  wordRefId: number;
  verseId: number;
  wordIndexId: number;
  wordNumber: number;
  meta?: object;
};

function transform(input: grammar.IUSFMParsedObject) {
}

export { };
