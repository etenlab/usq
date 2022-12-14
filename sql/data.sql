create or replace procedure load_data()
language plpgsql
as $$
declare
  v_collection_1_id bigint;
  v_book_1_index_id bigint;
  v_book_1_id bigint;
  v_chapter_1_id bigint;
  v_verse_1_id bigint;
  v_word_index_1_id_1 bigint;
  v_word_index_1_id_2 bigint;
  v_word_index_1_id_3 bigint;
  v_word_index_1_id_4 bigint;
  v_word_ref_1_id_1 bigint;
  v_word_ref_1_id_2 bigint;
  v_word_ref_1_id_3 bigint;
  v_word_ref_1_id_4 bigint;

  v_collection_2_id bigint;
  v_book_2_index_id bigint;
  v_book_2_id bigint;
  v_chapter_2_id bigint;
  v_verse_2_id bigint;
  v_word_index_2_id_1 bigint;
  v_word_index_2_id_2 bigint;
  v_word_index_2_id_3 bigint;
  v_word_index_2_id_4 bigint;
  v_word_ref_2_id_1 bigint;
  v_word_ref_2_id_2 bigint;
  v_word_ref_2_id_3 bigint;
  v_word_ref_2_id_4 bigint;

  v_strongs_word_index_id_1 bigint;
  v_strongs_word_index_id_2 bigint;
begin
  -- document 1
  insert into usq_collections(language_index, language_id, name)
  values ('_fake_index_1', 1, 'us_ENG')
  on conflict do nothing
  returning collection_id
  into v_collection_1_id;

  if v_collection_1_id is null then
    raise notice 'v_collection_1_id is null %', now();
    return;
  end if;

  insert into usq_book_index(name)
  values ('Genesis')
  returning book_index_id
  into v_book_1_index_id;

  insert into usq_books(collection_id, book_index_id)
  values (v_collection_1_id, v_book_1_index_id)
  returning book_id
  into v_book_1_id;

  insert into usq_chapters(book_id, chapter_number)
  values (v_book_1_id, 1)
  returning chapter_id
  into v_chapter_1_id;

  insert into usq_verses(chapter_id, verse_number)
  values (v_chapter_1_id, 1)
  returning verse_id
  into v_verse_1_id;

  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_1', 1, 'In')
  returning word_index_id
  into v_word_index_1_id_1;

  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_1', 1, 'the')
  returning word_index_id
  into v_word_index_1_id_2;

  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_1', 1, 'beginning')
  returning word_index_id
  into v_word_index_1_id_3;

  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_1', 1, 'God')
  returning word_index_id
  into v_word_index_1_id_4;

  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_1_id, v_word_index_1_id_1, 1)
  returning word_ref_id
  into v_word_ref_1_id_1;

  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_1_id, v_word_index_1_id_2, 2)
  returning word_ref_id
  into v_word_ref_1_id_2;

  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_1_id, v_word_index_1_id_3, 3)
  returning word_ref_id
  into v_word_ref_1_id_3;

  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_1_id, v_word_index_1_id_4, 4)
  returning word_ref_id
  into v_word_ref_1_id_4;

  -- document 2
  insert into usq_collections(language_index, language_id, name)
  values ('_fake_index_2', 1, '_fake twig 1')
  on conflict do nothing
  returning collection_id
  into v_collection_2_id;

  if v_collection_2_id is null then
    raise notice 'v_collection_2_id is null %', now();
    return;
  end if;

  insert into usq_books(collection_id, book_index_id)
  values (v_collection_2_id, v_book_1_index_id) -- use same book index
  returning book_id
  into v_book_2_id;

  insert into usq_chapters(book_id, chapter_number)
  values (v_book_2_id, 1)
  returning chapter_id
  into v_chapter_2_id;

  insert into usq_verses(chapter_id, verse_number)
  values (v_chapter_2_id, 1)
  returning verse_id
  into v_verse_2_id;

  -- different langauge than document 1
  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_2', 1, '_fake_In')
  returning word_index_id
  into v_word_index_2_id_1;

  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_2', 1, '_fake_the')
  returning word_index_id
  into v_word_index_2_id_2;

  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_2', 1, '_fake_beginning')
  returning word_index_id
  into v_word_index_2_id_3;

  insert into usq_word_index(language_index, language_id, word)
  values ('_fake_index_2', 1, '_fake_God')
  returning word_index_id
  into v_word_index_2_id_4;

  -- note the different word order
  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_2_id, v_word_index_2_id_1, 4)
  returning word_ref_id
  into v_word_ref_2_id_1;

  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_2_id, v_word_index_2_id_2, 3)
  returning word_ref_id
  into v_word_ref_2_id_2;

  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_2_id, v_word_index_2_id_3, 2)
  returning word_ref_id
  into v_word_ref_2_id_3;

  insert into usq_word_references(verse_id, word_index_id, word_number)
  values (v_verse_2_id, v_word_index_2_id_4, 1)
  returning word_ref_id
  into v_word_ref_2_id_4;

  -- alignment
  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'ALIGNMENT',
    'WORD',
    v_word_ref_1_id_1,
    'WORD',
    v_word_ref_2_id_4
  );

  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'ALIGNMENT',
    'WORD',
    v_word_ref_1_id_2,
    'WORD',
    v_word_ref_2_id_3
  );

  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'ALIGNMENT',
    'WORD',
    v_word_ref_1_id_3,
    'WORD',
    v_word_ref_2_id_2
  );

  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'ALIGNMENT',
    'WORD',
    v_word_ref_1_id_4,
    'WORD',
    v_word_ref_2_id_1
  );

  -- strongs
  insert into usq_word_index (language_index, language_id, word, meta)
  values (
    '_fake_index_1',
    '2', -- pretend biblical hebrew language id
    '????????????????',
    $asdf$
    {
      "H430": {
        "lemma": "????????????????",
        "xlit": "????l??h??ym",
        "pron": "el-o-heem'",
        "derivation": "plural of H433 (????????????????);",
        "strongs_def": "gods in the ordinary sense; but specifically used (in the plural thus, especially with the article) of the supreme God; occasionally applied by way of deference to magistrates; and sometimes as a superlative",
        "kjv_def": "angels, [idiom] exceeding, God (gods) (-dess, -ly), [idiom] (very) great, judges, [idiom] mighty."
      }
    }
    $asdf$
  )
  returning word_index_id
  into v_strongs_word_index_id_1;

  insert into usq_word_index (language_index, language_id, word, meta)
  values (
    '_fake_index_1',
    '2', -- pretend biblical hebrew language id
    '????????????????',
    $asdf$
  {
    "H7225": {
      "lemma": "????????????????",
      "xlit": "r????sh??yth",
      "pron": "ray-sheeth'",
      "derivation": "from the same as H7218 (??????????);",
      "strongs_def": "the first, in place, time, order or rank (specifically, a firstfruit)",
      "kjv_def": "beginning, chief(-est), first(-fruits, part, time), principal thing."
    }
  }
    $asdf$
  )
  returning word_index_id
  into v_strongs_word_index_id_2;

  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'RESOURCE',
    'WORD',
    v_word_ref_1_id_1, -- reference to word_index 'In'
    'WORD_INDEX',
    v_strongs_word_index_id_2 -- reference to hebrew word ????????????????
  );

  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'RESOURCE',
    'WORD',
    v_word_ref_1_id_2, -- reference to word_index 'the'
    'WORD_INDEX',
    v_strongs_word_index_id_2 -- reference to hebrew word ????????????????
  );

  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'RESOURCE',
    'WORD',
    v_word_ref_1_id_3, -- reference to word_index 'beginning'
    'WORD_INDEX',
    v_strongs_word_index_id_2 -- reference to hebrew word ????????????????
  );

  insert into usq_references(
    ref_type,
    source_type,
    source_id,
    target_type,
    target_id
  )
  values (
    'RESOURCE',
    'WORD',
    v_word_ref_1_id_4, -- reference to word_index 'God'
    'WORD_INDEX',
    v_strongs_word_index_id_1 -- reference to hebrew word ????????????????
  );

  refresh materialized view usq_word_to_word_alignment;
  refresh materialized view usq_word_to_word_index_resource;

end; $$;
