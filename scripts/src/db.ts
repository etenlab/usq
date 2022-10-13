import { IUSFMParsedObject } from 'usfm-grammar';

interface IInsertQueryParamters {
  language_index: string;
  language_id: number;
  collection_name: string;
  book_name: string;
}

interface ICollectionParameters {
  language_index: string;
  language_id: number;
  collection_name: string
}

const INSERT_QUERY_TEMPLATE = `
WITH collection AS (
     SELECT collection_id
     FROM usq_collections
     WHERE language_index = $1
       AND language_id    = $2
       AND name           = $3
),
book_index AS (
     INSERT INTO usq_book_index(name)
     VALUES ($4)
     ON CONFLICT (name) DO UPDATE
        SET name = excluded.name
     RETURNING book_index_id
)
INSERT INTO usq_books(collection_id, book_index_id)
SELECT collection.collection_id, book_index.book_index_id
FROM collection
CROSS JOIN book_index;
`;

function getInsertQuery(params: IInsertQueryParamters) {
  return {
    text: INSERT_QUERY_TEMPLATE,
    values: [
      params.language_index,
      params.language_id,
      params.collection_name,
      params.book_name
    ]
  }
}

function getInsertQueryParams(
    collection: ICollectionParameters,
    input: IUSFMParsedObject
): IInsertQueryParamters {

  return {
      ...collection,
      book_name: input.book.bookCode
  };

}

export {
    getInsertQuery,
    getInsertQueryParams
};
