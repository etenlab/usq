export const INSERT_QUERY_TEMPLATE = `
WITH collection AS (
     INSERT INTO usq_collections (language_index, language_id, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (language_index, language_id, name) DO UPDATE
        SET name = excluded.name
     RETURNING collection_id
),
book_index AS (
     INSERT INTO usq_book_index(name)
     VALUES ($4)
     ON CONFLICT (name) DO UPDATE
        SET name = excluded.name
     RETURNING book_index_id
),
book AS (
     INSERT INTO usq_books(collection_id, book_index_id)
     (SELECT collection.collection_id, book_index.book_index_id
     FROM collection
     CROSS JOIN book_index)
     ON CONFLICT(collection_id, book_index_id) DO UPDATE
        SET collection_id = excluded.collection_id
     RETURNING book_id, book_index_id, collection_id
),
chapter AS (
     INSERT INTO usq_chapters(book_id, chapter_number)
     VALUES
     ((SELECT book_id FROM book), $5)
     ON CONFLICT(book_id, chapter_number) DO UPDATE
        SET chapter_number = excluded.chapter_number
     RETURNING chapter_id
),
verse AS (
      INSERT INTO usq_verses(chapter_id, verse_number)
      VALUES
      ((SELECT chapter_id FROM chapter), $6)
      ON CONFLICT(chapter_id, verse_number) DO UPDATE
         SET verse_number = excluded.verse_number
      RETURNING verse_id
),
word AS (
     INSERT INTO usq_word_index(language_index, language_id, word)
     VALUES ($1, $2, $7)
     ON CONFLICT(language_index, language_id, word) DO UPDATE
        SET word = excluded.word
     RETURNING word_index_id
)
INSERT INTO usq_word_references(verse_id, word_index_id, word_number, meta)
VALUES
((SELECT verse_id FROM verse), (SELECT word_index_id FROM word), $8, $9);
`;
