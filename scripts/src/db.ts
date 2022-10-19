import { Client, Pool, PoolClient } from 'pg';
import { IUSFMParsedObject, IVerse, ChapterContent } from 'usfm-grammar';
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
  return str.split(/b/)
    .filter(substr => substr.match(/\w/));
}

export function getInsertParameters(collection: ICollectionParameters, data: IUSFMParsedObject) {
  const { languageIndex, languageId, collectionName } = collection;
  const bookName = data.book.bookCode;

  return data.chapters.flatMap(chapter => {
    const chapterNumber = chapter.chapterNumber;

    return chapter.contents
      .filter((content: ChapterContent) => {
        return content != null
          && typeof content === 'object'
          && 'verseNumber' in content
      })
      .flatMap((content: ChapterContent) => {
        const verse = content as IVerse;
        const verseNumber = parseInt(verse.verseNumber);
        let words: { word: string, attrs: object[] }[];
        if (verse.contents) {
          words = verse.contents
            .filter(d => {
              return d != null
                && typeof d === 'object'
                && 'w' in d
                && 'attributes' in d
            })
            // Type puning to make TS understand that the filter
            // above rules out other types d could be
            .map((d: any) => d as { w: string[], attributes: object[] })
            .flatMap((d) => {
              const ws = d.w.flatMap(realWordsOnly);
              return ws.map(word => ({ word, attrs: d.attributes }));
            });
        } else {
          words = [];
        }

        return words.map(({ word, attrs }, wordNumber) => ({
          languageIndex,
          languageId,
          collectionName,
          bookName,
          chapterNumber,
          verseNumber,
          word,
          wordNumber,
            meta: attrs.reduce((acc, o) => ({...acc, ...o}), {})
        }));
      });
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
