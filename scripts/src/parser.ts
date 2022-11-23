import { Proskomma } from 'proskomma';
import { readFileSync } from 'fs';

const pk = new Proskomma();

export type ItemType = 'graft' | 'scope' | 'token';
export type ItemSubtype = string;

export interface IItem {
  type: ItemType,
  subType: ItemSubtype,
  payload: string
}

export interface IVerse {
  items: IItem[],
  verseNumber: string
}

export interface IChapter {
  chapterNumber: number,
  verses: IVerse[]
}

export interface IDocument {
  title: string,
  chapters: IChapter[]
}

function normalizeArrayOfMaybes<T>(arr: Array<Maybe<T>>): T[] {
  return arr ? arr.filter(x => x) as T[] : [];
}

function normalizeMaybeArray<T>(arr: Maybe<Array<T>>): T[] {
  return arr ? arr : [];
}

function normalizeMaybeArrayOfMaybes<T>(arr: Maybe<Array<Maybe<T>>>): T[] {
  return normalizeArrayOfMaybes(normalizeMaybeArray(arr));
}

function normalizeItem(item: GqlItem): IItem {
  return {
    type: (item.type as ItemType),
    subType: item.subType,
    payload: item.payload
  };
}

function normalizeVerse(verse: GqlCvVerses): IVerse | null {
  if (verse.verse) {
    const el = normalizeMaybeArrayOfMaybes(verse.verse)[0];
    if (el) {
    return {
      items: normalizeArrayOfMaybes(el.items).map(normalizeItem),
      verseNumber: el.verseRange || ""
    };
    }
  }

  return null
}

function normalizeChapter(chapter: GqlCvIndex): IChapter {
  return {
    chapterNumber: chapter.chapter,
    verses: normalizeMaybeArrayOfMaybes(chapter.verses || [])
      .map(normalizeVerse)
      .filter((verse): verse is IVerse => verse !== null)
  }
}

function normalizeDocument(doc: GqlDocument): IDocument {
  return {
    title: doc.header || "",
    chapters: normalizeArrayOfMaybes(doc.cvIndexes).map(normalizeChapter)
  }
}

async function getDocument(): Promise<IDocument> {
  const query = `
{
documents {
header(id:"toc")
cvIndexes {
verses {
verse {
items {
payload
subType
type
}
verseRange
}
}
chapter
}
}
}
`;

  interface IReturn {
    data: {
      documents: GqlDocument[]
    }
  };

  return pk.gqlQuery(query).then((d: IReturn) => {
    return normalizeDocument(d.data.documents[0]);
  })
}

export default async function parseFile(filename: string): Promise<IDocument> {
  const content = readFileSync(filename, 'utf8');

  pk.importDocument(
    {
      lang: 'eng',
      abbr: 'kjv'
    },
    'usfm',
    content
  );

  return getDocument();
}
