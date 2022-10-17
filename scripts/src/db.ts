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
                const words = verse.verseText.split(/\s+/);
                return words.map((word, wordNumber) => ({
                    languageIndex,
                    languageId,
                    collectionName,
                    bookName,
                    chapterNumber,
                    verseNumber,
                    word,
                    wordNumber
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
      params.wordNumber
    ]
  };

  return await client.query(query);
}
