-- USQ - Universal Scripture SQL Schema

create table usq_schemas (
  schema_id bigserial primary key,
  name varchar(128) unique not null,
  meta jsonb
);

create table usq_collections (
  collection_id bigserial primary key,
  language_index varchar(64) not null,
  language_id bigserial not null,
  name varchar(256) not null,
  meta jsonb,
  unique (language_index, language_id, name)
);

create table usq_book_index (
  book_index_id bigserial primary key,
  name varchar(64) not null unique,
  meta jsonb
);

create table usq_books (
  book_id bigserial primary key,
  collection_id bigint not null references usq_collections(collection_id),
  book_index_id bigint not null references usq_book_index(book_index_id),
  meta jsonb,
  unique (collection_id, book_index_id)
);

create table usq_chapters (
  chapter_id bigserial primary key,
  book_id bigint not null references usq_books(book_id),
  chapter_number int not null,
  meta jsonb,
  unique (book_id, chapter_number)
);

create table usq_verses (
  verse_id bigserial primary key,
  chapter_id bigint not null references usq_chapters(chapter_id),
  verse_number int not null,
  meta jsonb,
  unique (chapter_id, verse_number)
);

create table usq_word_index (
  word_index_id bigserial primary key,
  language_index varchar(64) not null,
  language_id bigserial not null,
  word varchar(64) not null,
  meta jsonb,
  unique (language_index, language_id, word)
);

create table usq_word_references (
  word_ref_id bigserial primary key,
  verse_id bigint not null references usq_verses(verse_id),
  word_index_id bigint not null references usq_word_index(word_index_id),
  word_number int not null,
  meta jsonb
);

-- references

create type relationship_type as enum (
  'RESOURCE',
  'ALIGNMENT'
);

create type reference_type as enum (
  'WORD',
  'VERSE',
  'CHAPTER',
  'BOOK',
  'collection'
);

create table usq_references (
  reference_id bigserial primary key,
  ref_type relationship_type not null,
  source_type reference_type not null,
  source_id bigint not null,
  target_type reference_type not null,
  target_id bigint not null,
  meta jsonb,
  unique (source_type, source_id, target_type, target_id)
);

-- we'll create any needed materialized views for hasura to 
-- use to create graphql apis

-- view name format:
-- usq_[source]_to_[target]_[relationship_type]

-- alignment

-- source and target tables are usq_word_references
create materialized view usq_word_to_word_alignment as
  select reference_id, source_id, target_id, meta
  from usq_references
  where 
    ref_type = 'ALIGNMENT' and
    source_type = 'WORD' and
    target_type = 'WORD'
with no data;

refresh materialized view usq_word_to_word_alignment;
