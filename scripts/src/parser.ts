import { Proskomma } from 'proskomma';
import { readFileSync } from 'fs';

const pk = new Proskomma();

interface IItem {
  type: string,
  subType: string,
  payload: string
}

interface IVerse {
  items: IItem[],
  verseNumber: string
}

interface IChapter {
  chapterNumber: number,
  verses: IVerse[]
}

function normalizeArrayOfMaybes<T>(arr: Array<Maybe<T>>): T[] {
  return arr ? arr.filter(x => x) as T[] : [];
}

function normalizeMaybeArray<T>(arr: Maybe<Array<T>>): T[] {
  return arr ? arr : [];
}

function normalizeMabyeArrayOfMaybes<T>(arr: Maybe<Array<Maybe<T>>>): T[] {
  return normalizeArrayOfMaybes(normalizeMaybeArray(arr));
}

function normalizeItem(item: Item): IItem {
  return {
    type: item.type,
    subType: item.subType,
    payload: item.payload
  };
}

function normalizeVerse(verse: CvVerses): IVerse {
  // Not sure why graphql-code-generator spits out this type like
  // this, when CvVerses only contain one verse element. This does the
  // type punning needed for TS to not complain.
  const el: CvVerseElement = verse as any as CvVerseElement;
  return {
    items: normalizeArrayOfMaybes(el.items).map(normalizeItem),
    verseNumber: el.verseRange || ""
  };
}

function normalizeChapter(chapter: CvIndex): IChapter {
  return {
    chapterNumber: chapter.chapter,
    verses: normalizeMabyeArrayOfMaybes(chapter.verses || []).map(normalizeVerse)
  }
}

function normalizeDocument(doc: { header:string, cvIndexes: Array<Maybe<CvIndex>> }) {
  return {
    title: doc.header,
    chapters: normalizeArrayOfMaybes(doc.cvIndexes).map(normalizeChapter)
  }
}

function getDocument() {
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
      documents: {
        header: string,
        cvIndexes: Array<Maybe<CvIndex>>
      }[]
    }
  };

  return pk.gqlQuery(query).then((d: IReturn) => {
    return normalizeDocument(d.data.documents[0]);
  })
}

export default function parseFile(filename: string) {
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

parseFile('./data/eng-t4t_usfm/73-JHNeng-t4t.usfm')
  .then(d => {
    console.log(JSON.stringify(d, null, 2));
  });
