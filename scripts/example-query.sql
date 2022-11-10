-- Get a table of all the words in a verse, each in their own row

SELECT
        col.language_index,
        bi.name,
        c.chapter_number,
        v.verse_number,
        wr.word_number,
        wi.word,
        wr.meta
FROM
        usq_word_references wr
JOIN
        usq_word_index wi
        ON wr.word_index_id = wi.word_index_id
JOIN
        usq_verses v
        ON wr.verse_id = v.verse_id
JOIN
        usq_chapters c
        ON v.chapter_id = c.chapter_id
JOIN
        usq_books b
        ON c.book_id = b.book_id
JOIN
        usq_book_index bi
        ON b.book_index_id = bi.book_index_id
JOIN
        usq_collections col
        ON b.collection_id = col.collection_id
WHERE
        bi.name = 'JHN' AND c.chapter_number = 1 AND v.verse_number = 1
GROUP BY
      col.language_index,
      bi.book_index_id,
      c.chapter_id,
      v.verse_id,
      wr.word_ref_id,
      wi.word
ORDER BY
      bi.name,
      c.chapter_number,
      v.verse_number,
      wr.word_number,
      wi.word;

-- Get a verse with the words concatenated into a single string value

SELECT
        col.language_index,
        bi.name,
        c.chapter_number,
        v.verse_number,
        string_agg(wi.word, ' ')
FROM
        usq_word_references wr
JOIN
        usq_word_index wi
        ON wr.word_index_id = wi.word_index_id
JOIN
        usq_verses v
        ON wr.verse_id = v.verse_id
JOIN
        usq_chapters c
        ON v.chapter_id = c.chapter_id
JOIN
        usq_books b
        ON c.book_id = b.book_id
JOIN
        usq_book_index bi
        ON b.book_index_id = bi.book_index_id
JOIN
        usq_collections col
        ON b.collection_id = col.collection_id
WHERE
        bi.name = 'JHN' AND c.chapter_number = 1 AND v.verse_number = 1
GROUP BY
      col.language_index,
      bi.book_index_id,
      c.chapter_id,
      v.verse_id
ORDER BY
      bi.name,
      c.chapter_number,
      v.verse_number;
