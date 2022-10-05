

-- USQ - Universal Scripture SQL

create table usq_schemas (
  schema_id bigserial primary key,
  name varchar(128) unique not null,
  meta jsonb
);

create table usq_bibles (
  bible_id bigserial primary key,
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
  bible_id bigint not null references usq_bibles(bible_id),
  book_index_id bigint not null references usq_book_index(book_index_id),
  meta jsonb,
  unique (bible_id, book_index_id)
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

-- Alignment References (two_way)

create type usq_alignment_type as enum (
  '>', 
  '<',
  '=' 
);

create table usq_chapter_starts_alignment (
  chapter_starts_alignment_id bigserial primary key,
  chapter_id_1 bigint not null references usq_chapters(chapter_id),
  chapter_id_2 bigint not null references usq_chapters(chapter_id),
  alignment usq_alignment_type not null,
  meta jsonb,
  unique (chapter_id_1, chapter_id_2)
);

create table usq_chapter_stops_alignment (
  chapter_stops_alignment_id bigserial primary key,
  chapter_id_1 bigint not null references usq_chapters(chapter_id),
  chapter_id_2 bigint not null references usq_chapters(chapter_id),
  alignment usq_alignment_type not null,
  meta jsonb,
  unique (chapter_id_1, chapter_id_2)
);

create table usq_verse_starts_alignment (
  verse_starts_alignment_id bigserial primary key,
  verse_id_1 bigint not null references usq_verses(verse_id),
  verse_id_2 bigint not null references usq_verses(verse_id),
  alignment usq_alignment_type not null,
  meta jsonb,
  unique (verse_id_1, verse_id_2)
);

create table usq_verse_stops_alignment (
  verse_stops_alignment_id bigserial primary key,
  verse_id_1 bigint not null references usq_verses(verse_id),
  verse_id_2 bigint not null references usq_verses(verse_id),
  alignment usq_alignment_type not null,
  meta jsonb,
  unique (verse_id_1, verse_id_2)
);

-- Resource References (one-way)

create table usq_word_to_word_references (
  word_word_ref_id bigserial primary key,
  source_word bigint not null references usq_word_references(word_ref_id),
  target_word bigint not null references usq_word_references(word_ref_id),
  meta jsonb
);

create table usq_word_to_verse_references (
  word_verse_ref_id bigserial primary key,
  source_word bigint not null references usq_word_references(word_ref_id),
  target_verse bigint not null references usq_verses(verse_id),
  meta jsonb
);

create table usq_word_to_chapter_references (
  word_chapter_ref_id bigserial primary key,
  source_word bigint not null references usq_word_references(word_ref_id),
  target_chapter bigint not null references usq_chapters(chapter_id),
  meta jsonb
);

create table usq_verse_to_verse_references (
  verse_verse_ref_id bigserial primary key,
  source_verse bigint not null references usq_verses(verse_id),
  target_verse bigint not null references usq_verses(verse_id),
  meta jsonb
);

create table usq_verse_to_chapter_references (
  verse_chapter_ref_id bigserial primary key,
  source_verse bigint not null references usq_verses(verse_id),
  target_chapter bigint not null references usq_chapters(chapter_id),
  meta jsonb
);

create table usq_book_to_chapter_references (
  book_chapter_ref_id bigserial primary key,
  source_book bigint not null references usq_books(book_id),
  target_chapter bigint not null references usq_chapters(chapter_id),
  meta jsonb
);

-- more types of reference tables can be created as needed
