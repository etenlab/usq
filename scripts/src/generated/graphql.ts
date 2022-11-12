export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Attribute Specification */
export type AttSpec = {
  /** The attribute key (ie the bit to the left of the equals sign in USX) */
  attKey: Scalars['String'];
  /** The type of attribute, ie what type of thing it's connected to */
  attType: Scalars['String'];
  /** The name of the USFM tag to which the attribute is connected */
  tagName: Scalars['String'];
  /** The position of the value (which is 0 except for attributes with multiple values) */
  valueN: Scalars['Int'];
};

/** Part of a sequence, roughly equivalent to a USFM paragraph */
export type Block = {
  __typename?: 'Block';
  /** A list of block grafts for this block */
  bg: Array<Item>;
  /** The length in bytes of the succinct representation of bg (block grafts) */
  bgBL: Scalars['Int'];
  /** The number of items in the succinct representation of bg (block grafts) */
  bgL: Scalars['Int'];
  /** The block scope for this block */
  bs: Item;
  /** The length in bytes of the succinct representation of c (block items) */
  cBL: Scalars['Int'];
  /** The number of items in the succinct representation of c (block items) */
  cL: Scalars['Int'];
  /** The block content as a string in a compact eyeballable format */
  dump: Scalars['String'];
  /** A list of included scopes for this block */
  is: Array<Item>;
  /** The length in bytes of the succinct representation of is (included scopes) */
  isBL: Scalars['Int'];
  /** The number of items in the succinct representation of is (included scopes) */
  isL: Scalars['Int'];
  /** 'Block items grouped by scopes or milestones */
  itemGroups: Array<Maybe<ItemGroup>>;
  /** A list of items from the c (content) field of the block */
  items: Array<Item>;
  /** The value of nextToken at the start of this block */
  nt: Scalars['Int'];
  /** The length in bytes of the succinct representation of nt (nextToken at the start of the block) */
  ntBL: Scalars['Int'];
  /** A list of open scopes for this block */
  os: Array<Item>;
  /** The length in bytes of the succinct representation of os (open scopes) */
  osBL: Scalars['Int'];
  /** The number of items in the succinct representation of os (open scopes) */
  osL: Scalars['Int'];
  /** A list of the labels for the block\'s bs, os and is scopes */
  scopeLabels: Array<Scalars['String']>;
  /** The text of the block as a single string */
  text: Scalars['String'];
  /** A list of tokens from the c (content) field of the block */
  tokens: Array<Item>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
export type BlockItemGroupsArgs = {
  byMilestones?: InputMaybe<Array<Scalars['String']>>;
  byScopes?: InputMaybe<Array<Scalars['String']>>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
export type BlockItemsArgs = {
  anyScope?: InputMaybe<Scalars['Boolean']>;
  includeContext?: InputMaybe<Scalars['Boolean']>;
  withScopes?: InputMaybe<Array<Scalars['String']>>;
  withScriptureCV?: InputMaybe<Scalars['String']>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
export type BlockScopeLabelsArgs = {
  startsWith?: InputMaybe<Array<Scalars['String']>>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
export type BlockTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
  withScriptureCV?: InputMaybe<Scalars['String']>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
export type BlockTokensArgs = {
  anyScope?: InputMaybe<Scalars['Boolean']>;
  includeContext?: InputMaybe<Scalars['Boolean']>;
  withChars?: InputMaybe<Array<Scalars['String']>>;
  withMatchingChars?: InputMaybe<Array<Scalars['String']>>;
  withScopes?: InputMaybe<Array<Scalars['String']>>;
  withScriptureCV?: InputMaybe<Scalars['String']>;
  withSubTypes?: InputMaybe<Array<Scalars['String']>>;
};

/** A collection of documents that share the same set of selector values */
export type DocSet = {
  __typename?: 'DocSet';
  /** A document in the docSet, if present */
  document?: Maybe<Document>;
  /** The documents in the docSet */
  documents: Array<Document>;
  /** The internal index number corresponding to a string in a given docSet enum */
  enumIndexForString: Scalars['Int'];
  /** Information about internal indexes matching the case-insensitive regex in a given docSet enum */
  enumRegexIndexesForString: Array<RegexIndex>;
  /** Whether the docSet has versification information loaded */
  hasMapping: Scalars['Boolean'];
  /** Whether or not the docSet has the specified tag */
  hasTag: Scalars['Boolean'];
  /** The id of the docSet, which is formed by concatenating the docSet's selector values */
  id: Scalars['String'];
  /** The number of documents in the docSet */
  nDocuments: Scalars['Int'];
  /** A selector for this docSet */
  selector: Scalars['String'];
  /** The selectors of the docSet */
  selectors: Array<KeyValue>;
  /** A list of the tags of this docSet */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this docSet as key/value tuples */
  tagsKv: Array<KeyValue>;
  /** A list of unique characters in the docSet */
  uniqueChars: Array<Scalars['String']>;
  /** A string containing the unique characters in the docSet */
  uniqueCharsString: Scalars['String'];
  /** A list of wordLike token strings in the docSet */
  wordLikes: Array<Scalars['String']>;
};


/** A collection of documents that share the same set of selector values */
export type DocSetDocumentArgs = {
  bookCode: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
export type DocSetDocumentsArgs = {
  allChars?: InputMaybe<Scalars['Boolean']>;
  allScopes?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  sortedBy?: InputMaybe<Scalars['String']>;
  withChars?: InputMaybe<Array<Scalars['String']>>;
  withHeaderValues?: InputMaybe<Array<InputKeyValue>>;
  withMatchingChars?: InputMaybe<Array<Scalars['String']>>;
  withScopes?: InputMaybe<Array<Scalars['String']>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};


/** A collection of documents that share the same set of selector values */
export type DocSetEnumIndexForStringArgs = {
  enumType: Scalars['String'];
  searchString: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
export type DocSetEnumRegexIndexesForStringArgs = {
  enumType: Scalars['String'];
  searchRegex: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
export type DocSetHasTagArgs = {
  tagName: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
export type DocSetSelectorArgs = {
  id: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
export type DocSetWordLikesArgs = {
  coerceCase?: InputMaybe<Scalars['String']>;
};

/** A document, typically corresponding to USFM for one book */
export type Document = {
  __typename?: 'Document';
  /** The content of a chapter */
  cIndex: CIndex;
  /** The content of the main sequence indexed by chapter */
  cIndexes: Array<Maybe<CIndex>>;
  /** Content for a Scripture reference within this document, using local versification */
  cv: Array<ItemGroup>;
  /** The content of the specified chapter indexed by chapterVerse */
  cvIndex: CvIndex;
  /** The content of the main sequence indexed by chapterVerse */
  cvIndexes: Array<Maybe<CvIndex>>;
  /** Verses matching the arguments */
  cvMatching: Array<ItemGroup>;
  /** What's previous and next with respect to the specified verse */
  cvNavigation?: Maybe<CvNavigation>;
  /** The id of the docSet to which this document belongs */
  docSetId: Scalars['String'];
  /** 'Whether or not the document has the specified tag */
  hasTag: Scalars['Boolean'];
  /** One USFM header */
  header?: Maybe<Scalars['String']>;
  /** USFM header information such as TOC */
  headers: Array<KeyValue>;
  /** The id of the document */
  id: Scalars['String'];
  /** A parsed version of the id header */
  idParts: IdParts;
  /** The key-value sequence with the specified id */
  kvSequence?: Maybe<KvSequence>;
  /** A list of key-value sequences for this document */
  kvSequences: Array<KvSequence>;
  /** The blocks of the main sequence */
  mainBlocks: Array<Block>;
  /** The items for each block of the main sequence */
  mainBlocksItems: Array<Array<Item>>;
  /** The text for each block of the main sequence */
  mainBlocksText: Array<Scalars['String']>;
  /** The tokens for each block of the main sequence */
  mainBlocksTokens: Array<Array<Item>>;
  /** The main sequence */
  mainSequence: Sequence;
  /** The text for the main sequence */
  mainText: Scalars['String'];
  /** Content for a Scripture reference within this document, using the versification of the specified docSet */
  mappedCv: Array<ItemGroup>;
  /** Content for each verse of a chapter within this document, using the versification of the specified docSet */
  mappedCvs: Array<Array<ItemGroup>>;
  /** The number of sequences */
  nSequences: Scalars['Int'];
  /** A string of PERF JSON for this document */
  perf: Scalars['String'];
  /** The sequence with the specified id */
  sequence?: Maybe<Sequence>;
  /** A list of sequences for this document */
  sequences: Array<Sequence>;
  /** The table sequence with the specified id */
  tableSequence?: Maybe<TableSequence>;
  /** A list of table sequences for this document */
  tableSequences: Array<TableSequence>;
  /** A list of the tags of this document */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this document as key/value tuples */
  tagsKv: Array<KeyValue>;
  /** A list of text (ie non-table, non-tree, non-kv) sequences for this document */
  textSequences: Array<Sequence>;
  /** The tree sequence with the specified id */
  treeSequence?: Maybe<TreeSequence>;
  /** A list of tree sequences for this document */
  treeSequences: Array<TreeSequence>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentCIndexArgs = {
  chapter: Scalars['Int'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentCvArgs = {
  chapter?: InputMaybe<Scalars['String']>;
  chapterVerses?: InputMaybe<Scalars['String']>;
  includeContext?: InputMaybe<Scalars['Boolean']>;
  verses?: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentCvIndexArgs = {
  chapter: Scalars['Int'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentCvMatchingArgs = {
  allChars?: InputMaybe<Scalars['Boolean']>;
  allScopes?: InputMaybe<Scalars['Boolean']>;
  withChars?: InputMaybe<Array<Scalars['String']>>;
  withMatchingChars?: InputMaybe<Array<Scalars['String']>>;
  withScopes?: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentCvNavigationArgs = {
  chapter: Scalars['String'];
  verse: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentHasTagArgs = {
  tagName: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentHeaderArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentKvSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentKvSequencesArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentMainBlocksTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentMainTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentMappedCvArgs = {
  chapter: Scalars['String'];
  includeContext?: InputMaybe<Scalars['Boolean']>;
  mappedDocSetId: Scalars['String'];
  verses: Array<Scalars['String']>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentMappedCvsArgs = {
  chapter: Scalars['String'];
  includeContext?: InputMaybe<Scalars['Boolean']>;
  mappedDocSetId: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentPerfArgs = {
  indent?: InputMaybe<Scalars['Int']>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentSequencesArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<Scalars['String']>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentTableSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentTableSequencesArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentTextSequencesArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
export type DocumentTreeSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
export type DocumentTreeSequencesArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};

/** Item for arguments */
export type InputItemObject = {
  /** The content of the item (the text for tokens, the label for scopes and the sequence id for grafts) */
  payload: Scalars['String'];
  /** The type-dependent subtype of the item */
  subType: Scalars['String'];
  /** The basic item type (token, scope or graft)' */
  type: Scalars['String'];
};

/** Input Key/Value Object */
export type InputKeyValue = {
  /** The key */
  key: Scalars['String'];
  /** The value */
  value: Scalars['String'];
};

/** Item */
export type Item = {
  __typename?: 'Item';
  /** The content of the item (the text for tokens, the label for scopes and the sequence id for grafts) */
  payload: Scalars['String'];
  /** If 'includeContext' was selected, and for tokens, the index of the token from the start of the sequence */
  position?: Maybe<Scalars['Int']>;
  /** If 'includeContext' was selected, a list of scopes that are open around the item */
  scopes?: Maybe<Array<Scalars['String']>>;
  /** The type-dependent subtype of the item */
  subType: Scalars['String'];
  /** The basic item type (token, scope or graft) */
  type: Scalars['String'];
};


/** Item */
export type ItemPayloadArgs = {
  excludeChars?: InputMaybe<Array<Scalars['String']>>;
  includeChars?: InputMaybe<Array<Scalars['String']>>;
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


/** Item */
export type ItemPositionArgs = {
  startsWith?: InputMaybe<Array<Scalars['String']>>;
};


/** Item */
export type ItemScopesArgs = {
  startsWith?: InputMaybe<Array<Scalars['String']>>;
};

/** A collection of items, with scope context */
export type ItemGroup = {
  __typename?: 'ItemGroup';
  /** The itemGroup content as a string in a compact eyeballable format */
  dump: Scalars['String'];
  /** A list of scopes from the items of the itemGroup */
  includedScopes: Array<Scalars['String']>;
  /** Items for this itemGroup */
  items: Array<Item>;
  /** The labels of scopes that were open at the beginning of the itemGroup */
  scopeLabels: Array<Scalars['String']>;
  /** The text of the itemGroup as a single string */
  text: Scalars['String'];
  /** Tokens for this itemGroup */
  tokens: Array<Item>;
};


/** A collection of items, with scope context */
export type ItemGroupScopeLabelsArgs = {
  startsWith?: InputMaybe<Array<Scalars['String']>>;
};


/** A collection of items, with scope context */
export type ItemGroupTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


/** A collection of items, with scope context */
export type ItemGroupTokensArgs = {
  withChars?: InputMaybe<Array<Scalars['String']>>;
  withSubTypes?: InputMaybe<Array<Scalars['String']>>;
};

/** Key/Regex tuple */
export type KeyMatches = {
  /** The key */
  key: Scalars['String'];
  /** The regex to match */
  matches: Scalars['String'];
};

/** Key/Value tuple */
export type KeyValue = {
  __typename?: 'KeyValue';
  /** The key */
  key: Scalars['String'];
  /** The value */
  value: Scalars['String'];
};

/** Input Key/Values Object */
export type KeyValues = {
  /** The key */
  key: Scalars['String'];
  /** The values */
  values: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add one or more tags to a docSet, if they are not already present */
  addDocSetTags: Array<Scalars['String']>;
  /** Adds a document which will be assigned to an existing or new docSet on the basis of the specified selectors */
  addDocument: Scalars['Boolean'];
  /** Add one or more tags to a document, if they are not already present */
  addDocumentTags?: Maybe<Array<Scalars['String']>>;
  /** Add one or more tags to a sequence, if they are not already present */
  addSequenceTags?: Maybe<Array<Scalars['String']>>;
  /** Deletes a block from a sequence */
  deleteBlock?: Maybe<Scalars['Boolean']>;
  /** Deletes a docSet */
  deleteDocSet?: Maybe<Scalars['Boolean']>;
  /** Deletes a document */
  deleteDocument?: Maybe<Scalars['Boolean']>;
  /** Deletes a sequence from a document */
  deleteSequence?: Maybe<Scalars['Boolean']>;
  /** Garbage collects unused sequences within a document. (You probably don\'t need to do this.) */
  gcSequences: Scalars['Boolean'];
  /** Adds a new block to a sequence */
  newBlock: Scalars['Boolean'];
  /** Creates a new, empty sequence */
  newSequence: Scalars['String'];
  /** Explicitly rebuild the text lookup tables for a docSet. (You probably don't need to do this) */
  rehashDocSet: Scalars['Boolean'];
  /** Remove one or more tags from a docSet, if they are present */
  removeDocSetTags?: Maybe<Array<Scalars['String']>>;
  /** Remove one or more tags from a document, if they are present */
  removeDocumentTags?: Maybe<Array<Scalars['String']>>;
  /** Remove one or more tags from a sequence, if they are present */
  removeSequenceTags?: Maybe<Array<Scalars['String']>>;
  /** Adds verse mapping tables to the documents in a docSet, where the verse mapping may be provided in legacy .vrs or JSON format */
  setVerseMapping: Scalars['Boolean'];
  /** Removes verse mapping tables from the documents in a docSet */
  unsetVerseMapping: Scalars['Boolean'];
  /** Replaces all the blocks of a sequence with a new set of blocks */
  updateAllBlocks: Scalars['Boolean'];
  /** Replaces the items of a block with a new set of items */
  updateItems: Scalars['Boolean'];
};


export type MutationAddDocSetTagsArgs = {
  docSetId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


export type MutationAddDocumentArgs = {
  content: Scalars['String'];
  contentType: Scalars['String'];
  selectors: Array<InputKeyValue>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationAddDocumentTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


export type MutationAddSequenceTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


export type MutationDeleteBlockArgs = {
  blockN: Scalars['Int'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
};


export type MutationDeleteDocSetArgs = {
  docSetId: Scalars['String'];
};


export type MutationDeleteDocumentArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
};


export type MutationDeleteSequenceArgs = {
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
};


export type MutationGcSequencesArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
};


export type MutationNewBlockArgs = {
  blockN: Scalars['Int'];
  blockScope: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
};


export type MutationNewSequenceArgs = {
  blocksSpec?: InputMaybe<Array<InputBlockSpec>>;
  documentId: Scalars['String'];
  graftToMain?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  type: Scalars['String'];
};


export type MutationRehashDocSetArgs = {
  docSetId: Scalars['String'];
};


export type MutationRemoveDocSetTagsArgs = {
  docSetId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRemoveDocumentTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


export type MutationRemoveSequenceTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


export type MutationSetVerseMappingArgs = {
  docSetId: Scalars['String'];
  jsonSource?: InputMaybe<Scalars['String']>;
  vrsSource?: InputMaybe<Scalars['String']>;
};


export type MutationUnsetVerseMappingArgs = {
  docSetId: Scalars['String'];
};


export type MutationUpdateAllBlocksArgs = {
  blocksSpec: Array<InputBlockSpec>;
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateItemsArgs = {
  blockGrafts?: InputMaybe<Array<InputItemObject>>;
  blockPosition: Scalars['Int'];
  blockScope?: InputMaybe<InputItemObject>;
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  items?: InputMaybe<Array<InputItemObject>>;
  sequenceId?: InputMaybe<Scalars['String']>;
};

/** The top level of Proskomma queries */
export type Query = {
  __typename?: 'Query';
  /** The docSet with the specified id */
  docSet?: Maybe<DocSet>;
  /** The docSets in the processor */
  docSets: Array<DocSet>;
  /** The document with the specified id, or the specified docSet and withBook */
  document?: Maybe<Document>;
  /** The documents in the processor */
  documents: Array<Document>;
  /** The id of the processor, which is different for each Proskomma instance */
  id: Scalars['String'];
  /** The number of docSets */
  nDocSets: Scalars['Int'];
  /** The number of documents in the processor */
  nDocuments: Scalars['Int'];
  /** The NPM package version */
  packageVersion: Scalars['String'];
  /** A string describing the processor class */
  processor: Scalars['String'];
  /** The selectors used to define docSets */
  selectors: Array<SelectorSpec>;
};


/** The top level of Proskomma queries */
export type QueryDocSetArgs = {
  id: Scalars['String'];
};


/** The top level of Proskomma queries */
export type QueryDocSetsArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
  withBook?: InputMaybe<Scalars['String']>;
  withSelectors?: InputMaybe<Array<InputKeyValue>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};


/** The top level of Proskomma queries */
export type QueryDocumentArgs = {
  docSetId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  withBook?: InputMaybe<Scalars['String']>;
};


/** The top level of Proskomma queries */
export type QueryDocumentsArgs = {
  ids?: InputMaybe<Array<Scalars['String']>>;
  sortedBy?: InputMaybe<Scalars['String']>;
  withBook?: InputMaybe<Scalars['String']>;
  withHeaderValues?: InputMaybe<Array<InputKeyValue>>;
  withTags?: InputMaybe<Array<Scalars['String']>>;
  withoutTags?: InputMaybe<Array<Scalars['String']>>;
};

/** A contiguous flow of content */
export type Sequence = {
  __typename?: 'Sequence';
  /** The blocks in the sequence */
  blocks: Array<Block>;
  /** The items for each block in the sequence */
  blocksItems?: Maybe<Array<Array<Item>>>;
  /** The text for each block in the sequence */
  blocksText?: Maybe<Array<Scalars['String']>>;
  /** The tokens for each block in the sequence */
  blocksTokens?: Maybe<Array<Array<Item>>>;
  /** Returns true if a main sequence contains the specified tokens */
  hasChars: Scalars['Boolean'];
  /** Returns true if a main sequence contains a match for specified regexes */
  hasMatchingChars: Scalars['Boolean'];
  /** Whether or not the sequence has the specified tag */
  hasTag: Scalars['Boolean'];
  /** The id of the sequence */
  id: Scalars['String'];
  /** Sequence content grouped by scopes or milestones */
  itemGroups: Array<ItemGroup>;
  /** The number of blocks in the sequence */
  nBlocks: Scalars['Int'];
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<KeyValue>;
  /** The text for the sequence */
  text: Scalars['String'];
  /** The type of the sequence (main, heading...) */
  type: Scalars['String'];
  /** A list of wordLike token strings in a main sequence */
  wordLikes: Array<Scalars['String']>;
};


/** A contiguous flow of content */
export type SequenceBlocksArgs = {
  allAtts?: InputMaybe<Scalars['Boolean']>;
  allChars?: InputMaybe<Scalars['Boolean']>;
  attSpecs?: InputMaybe<Array<Array<AttSpec>>>;
  attValues?: InputMaybe<Array<Array<Scalars['String']>>>;
  positions?: InputMaybe<Array<Scalars['Int']>>;
  withBlockScope?: InputMaybe<Scalars['String']>;
  withChars?: InputMaybe<Array<Scalars['String']>>;
  withMatchingChars?: InputMaybe<Array<Scalars['String']>>;
  withScopes?: InputMaybe<Array<Scalars['String']>>;
  withScriptureCV?: InputMaybe<Scalars['String']>;
};


/** A contiguous flow of content */
export type SequenceBlocksTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


/** A contiguous flow of content */
export type SequenceHasCharsArgs = {
  allChars?: InputMaybe<Scalars['Boolean']>;
  chars?: InputMaybe<Array<Scalars['String']>>;
};


/** A contiguous flow of content */
export type SequenceHasMatchingCharsArgs = {
  allChars?: InputMaybe<Scalars['Boolean']>;
  chars?: InputMaybe<Array<Scalars['String']>>;
};


/** A contiguous flow of content */
export type SequenceHasTagArgs = {
  tagName: Scalars['String'];
};


/** A contiguous flow of content */
export type SequenceItemGroupsArgs = {
  byMilestones?: InputMaybe<Array<Scalars['String']>>;
  byScopes?: InputMaybe<Array<Scalars['String']>>;
};


/** A contiguous flow of content */
export type SequenceTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


/** A contiguous flow of content */
export type SequenceWordLikesArgs = {
  coerceCase?: InputMaybe<Scalars['String']>;
};

/** A chapter index entry */
export type CIndex = {
  __typename?: 'cIndex';
  /** The chapter number */
  chapter: Scalars['Int'];
  /** The items as a string in a compact eyeballable format */
  dumpItems?: Maybe<Scalars['String']>;
  /** The zero-indexed number of the block where the chapter ends */
  endBlock?: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the chapter ends */
  endItem?: Maybe<Scalars['Int']>;
  /** A list of items for this chapter */
  items: Array<Maybe<Item>>;
  /** The value of nextToken at the beginning of the chapter */
  nextToken?: Maybe<Scalars['Int']>;
  /** The zero-indexed number of the block where the chapter starts */
  startBlock?: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the chapter starts */
  startItem?: Maybe<Scalars['Int']>;
  /** The text of the chapter as a single string */
  text: Scalars['String'];
  /** A list of tokens for this chapter */
  tokens: Array<Maybe<Item>>;
};


/** A chapter index entry */
export type CIndexItemsArgs = {
  includeContext?: InputMaybe<Scalars['Boolean']>;
};


/** A chapter index entry */
export type CIndexTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


/** A chapter index entry */
export type CIndexTokensArgs = {
  includeContext?: InputMaybe<Scalars['Boolean']>;
  withChars?: InputMaybe<Array<Scalars['String']>>;
  withSubTypes?: InputMaybe<Array<Scalars['String']>>;
};

/** A table cell */
export type Cell = {
  __typename?: 'cell';
  /** The column numbers */
  columns: Array<Scalars['Int']>;
  /** A list of items from the c (content) field of the cell */
  items: Array<Item>;
  /** The row numbers */
  rows: Array<Scalars['Int']>;
  /** The text of the cell as a single string */
  text: Scalars['String'];
  /** A list of tokens from the c (content) field of the cell */
  tokens: Array<Item>;
};


/** A table cell */
export type CellTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};

/** A chapter-verse reference */
export type Cv = {
  __typename?: 'cv';
  /** The chapter number */
  chapter?: Maybe<Scalars['Int']>;
  /** The verse number */
  verse?: Maybe<Scalars['Int']>;
};

/** A chapterVerse index entry */
export type CvIndex = {
  __typename?: 'cvIndex';
  /** The chapter number */
  chapter: Scalars['Int'];
  /** A list of verse number and range information, organized by verse number */
  verseNumbers?: Maybe<Array<VerseNumber>>;
  /** A list of verse number and range information, organized by verse range */
  verseRanges?: Maybe<Array<VerseRange>>;
  /** Information about the verses in the chapter */
  verses?: Maybe<Array<Maybe<CvVerses>>>;
};

/** Various answers to 'previous' and 'next' with respect to a verse */
export type CvNavigation = {
  __typename?: 'cvNavigation';
  /** The next chapter number (as a string) */
  nextChapter?: Maybe<Scalars['String']>;
  /** The verse number for the next verse */
  nextVerse?: Maybe<Cv>;
  /** The verse number for the next verse range */
  nextVerseRangeVerse?: Maybe<Cv>;
  /** The previous chapter number (as a string) */
  previousChapter?: Maybe<Scalars['String']>;
  /** The verse number for the previous verse */
  previousVerse?: Maybe<Cv>;
  /** The verse number for the previous verse range */
  previousVerseRangeVerse?: Maybe<Cv>;
};

export type CvVerseElement = {
  __typename?: 'cvVerseElement';
  /** The items as a string in a compact eyeballable format */
  dumpItems?: Maybe<Scalars['String']>;
  /** The zero-indexed number of the block where the verse ends */
  endBlock?: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the verse ends */
  endItem?: Maybe<Scalars['Int']>;
  /** A list of items for this verse */
  items: Array<Maybe<Item>>;
  /** The value of nextToken at the beginning of the verse */
  nextToken?: Maybe<Scalars['Int']>;
  /** The zero-indexed number of the block where the verse starts */
  startBlock?: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the verse starts */
  startItem?: Maybe<Scalars['Int']>;
  /** The text of the verse as a single string */
  text: Scalars['String'];
  /** A list of tokens for this verse */
  tokens: Array<Maybe<Item>>;
  /** The verse range for this verse as it would be printed in a Bible */
  verseRange?: Maybe<Scalars['String']>;
};


export type CvVerseElementItemsArgs = {
  includeContext?: InputMaybe<Scalars['Boolean']>;
};


export type CvVerseElementTextArgs = {
  normalizeSpace?: InputMaybe<Scalars['Boolean']>;
};


export type CvVerseElementTokensArgs = {
  includeContext?: InputMaybe<Scalars['Boolean']>;
  withChars?: InputMaybe<Array<Scalars['String']>>;
  withSubTypes?: InputMaybe<Array<Scalars['String']>>;
};

/** Information about a verse in the chapter, which may be split into several pieces */
export type CvVerses = {
  __typename?: 'cvVerses';
  /** The pieces of verse */
  verse?: Maybe<Array<Maybe<CvVerseElement>>>;
};

/** Type-dependent parts of the ID header */
export type IdParts = {
  __typename?: 'idParts';
  /** A part of the ID, by index */
  part?: Maybe<Scalars['String']>;
  /** An array of parts of the ID */
  parts?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The type of the ID */
  type?: Maybe<Scalars['String']>;
};


/** Type-dependent parts of the ID header */
export type IdPartsPartArgs = {
  index: Scalars['Int'];
};

/** A specification to create or update a block */
export type InputBlockSpec = {
  /** The block grafts as items */
  bg: Array<InputItemObject>;
  /** The block scope as an item */
  bs: InputItemObject;
  /** The included scopes as items */
  is: Array<InputItemObject>;
  /** The items */
  items: Array<InputItemObject>;
  /** The open scopes as items */
  os: Array<InputItemObject>;
};

/** Input specification of a selector */
export type InputSelectorSpec = {
  /** Enum of permitted string values */
  enum?: InputMaybe<Array<Scalars['String']>>;
  /** Inclusive maximum value for integer selector */
  max?: InputMaybe<Scalars['String']>;
  /** Inclusive minimum value for integer selector */
  min?: InputMaybe<Scalars['String']>;
  /** Name (ie the key) */
  name: Scalars['String'];
  /** Regex for validating string selector */
  regex?: InputMaybe<Scalars['String']>;
  /** Data type (string or integer) */
  type: Scalars['String'];
};

/** Key/Items tuple */
export type KvEntry = {
  __typename?: 'kvEntry';
  /** The fields as itemGroups */
  itemGroups: Array<Maybe<ItemGroup>>;
  /** The key */
  key: Scalars['String'];
  /** The secondary keys */
  secondaryKeys?: Maybe<Array<KeyValue>>;
};

/** A contiguous flow of content for key-values */
export type KvSequence = {
  __typename?: 'kvSequence';
  /** The entries in the key-value sequence */
  entries?: Maybe<Array<KvEntry>>;
  /** Whether or not the sequence has the specified tag */
  hasTag: Scalars['Boolean'];
  /** The id of the sequence */
  id: Scalars['String'];
  /** The number of entries in the key-value sequence */
  nEntries: Scalars['Int'];
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<KeyValue>;
};


/** A contiguous flow of content for key-values */
export type KvSequenceEntriesArgs = {
  contentEquals?: InputMaybe<Array<KeyValues>>;
  contentMatches?: InputMaybe<Array<KeyMatches>>;
  keyEquals?: InputMaybe<Array<Scalars['String']>>;
  keyMatches?: InputMaybe<Scalars['String']>;
  secondaryEquals?: InputMaybe<Array<KeyValues>>;
  secondaryMatches?: InputMaybe<Array<KeyMatches>>;
};


/** A contiguous flow of content for key-values */
export type KvSequenceHasTagArgs = {
  tagName?: InputMaybe<Scalars['String']>;
};

/** A tree node */
export type Node = {
  __typename?: 'node';
  /** The node children ids */
  childIds: Array<Scalars['String']>;
  /** The node id */
  id: Scalars['String'];
  /** The content as itemGroups */
  itemGroups: Array<ItemGroup>;
  /** The keys for content */
  keys: Array<Scalars['String']>;
  /** The node parent id */
  parentId?: Maybe<Scalars['String']>;
};


/** A tree node */
export type NodeItemGroupsArgs = {
  includeContext?: InputMaybe<Scalars['Boolean']>;
};

/** Mapped verse information */
export type Orig = {
  __typename?: 'orig';
  /** The book code */
  book?: Maybe<Scalars['String']>;
  /** A list of chapter-verse references */
  cvs: Array<Cv>;
};

/** Information about a regex match on an enum */
export type RegexIndex = {
  __typename?: 'regexIndex';
  /** The index in the enum */
  index: Scalars['String'];
  /** The string in the enum that matched */
  matched: Scalars['String'];
};

/** Row Equals Specification */
export type RowEqualsSpec = {
  /** The position of the column in which to search a match */
  colN: Scalars['Int'];
  /** The values to match */
  values: Array<Scalars['String']>;
};

/** Row Match Specification */
export type RowMatchSpec = {
  /** The position of the column in which to search a match */
  colN: Scalars['Int'];
  /** The regex to match */
  matching: Scalars['String'];
};

/** Specification of a selector */
export type SelectorSpec = {
  __typename?: 'selectorSpec';
  /** Enum of permitted string values */
  enum?: Maybe<Array<Scalars['String']>>;
  /** Inclusive maximum value for integer selector */
  max?: Maybe<Scalars['String']>;
  /** Inclusive minimum value for integer selector */
  min?: Maybe<Scalars['String']>;
  /** Name (ie the key) */
  name: Scalars['String'];
  /** Regex for validating string selector */
  regex?: Maybe<Scalars['String']>;
  /** Data type (string or integer) */
  type: Scalars['String'];
};

/** A contiguous flow of content for a table */
export type TableSequence = {
  __typename?: 'tableSequence';
  /** The cells in the table sequence */
  cells: Array<Cell>;
  /** Whether or not the sequence has the specified tag */
  hasTag: Scalars['Boolean'];
  /** A list of column headings for this tableSequence, derived from the sequence tags */
  headings: Array<Scalars['String']>;
  /** The id of the sequence */
  id: Scalars['String'];
  /** The number of cells in the table sequence */
  nCells: Scalars['Int'];
  /** The number of columns in the table sequence */
  nColumns: Scalars['Int'];
  /** The number of rows in the table sequence */
  nRows: Scalars['Int'];
  /** The rows in the table sequence */
  rows: Array<Array<Cell>>;
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<KeyValue>;
};


/** A contiguous flow of content for a table */
export type TableSequenceHasTagArgs = {
  tagName?: InputMaybe<Scalars['String']>;
};


/** A contiguous flow of content for a table */
export type TableSequenceRowsArgs = {
  columns?: InputMaybe<Array<Scalars['Int']>>;
  equals?: InputMaybe<Array<RowEqualsSpec>>;
  matches?: InputMaybe<Array<RowMatchSpec>>;
  positions?: InputMaybe<Array<Scalars['Int']>>;
};

/** The nodes of a tree */
export type TreeSequence = {
  __typename?: 'treeSequence';
  /** Whether or not the sequence has the specified tag */
  hasTag: Scalars['Boolean'];
  /** The id of the sequence */
  id: Scalars['String'];
  /** The number of nodes in the tree sequence */
  nNodes: Scalars['Int'];
  /** The nodes in the tree sequence */
  nodes: Array<Node>;
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<KeyValue>;
  /** The JSON results for the Tribos queries, as an array of strings */
  triboi: Array<Scalars['String']>;
  /** The JSON result for a Tribos query, as a string */
  tribos: Scalars['String'];
  /** Tribos documentation */
  tribosDoc: Scalars['String'];
};


/** The nodes of a tree */
export type TreeSequenceHasTagArgs = {
  tagName?: InputMaybe<Scalars['String']>;
};


/** The nodes of a tree */
export type TreeSequenceTriboiArgs = {
  queries: Array<Scalars['String']>;
};


/** The nodes of a tree */
export type TreeSequenceTribosArgs = {
  query: Scalars['String'];
};

/** Information about a verse number (which may be part of a verse range) */
export type VerseNumber = {
  __typename?: 'verseNumber';
  /** The verse number */
  number: Scalars['Int'];
  /** The reference for this verse when mapped to 'original' versification */
  orig: Orig;
  /** The verse range to which the verse number belongs */
  range: Scalars['String'];
};

/** Information about a verse range (which may only cover one verse) */
export type VerseRange = {
  __typename?: 'verseRange';
  /** A list of verse numbers for this range */
  numbers: Array<Scalars['Int']>;
  /** The range, as it would be printed in a Bible */
  range: Scalars['String'];
};
