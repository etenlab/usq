type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Attribute Specification */
type GqlAttSpec = {
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
type GqlBlock = {
  __typename?: 'Block';
  /** A list of block grafts for this block */
  bg: Array<GqlItem>;
  /** The length in bytes of the succinct representation of bg (block grafts) */
  bgBL: Scalars['Int'];
  /** The number of items in the succinct representation of bg (block grafts) */
  bgL: Scalars['Int'];
  /** The block scope for this block */
  bs: GqlItem;
  /** The length in bytes of the succinct representation of c (block items) */
  cBL: Scalars['Int'];
  /** The number of items in the succinct representation of c (block items) */
  cL: Scalars['Int'];
  /** The block content as a string in a compact eyeballable format */
  dump: Scalars['String'];
  /** A list of included scopes for this block */
  is: Array<GqlItem>;
  /** The length in bytes of the succinct representation of is (included scopes) */
  isBL: Scalars['Int'];
  /** The number of items in the succinct representation of is (included scopes) */
  isL: Scalars['Int'];
  /** 'Block items grouped by scopes or milestones */
  itemGroups: Array<Maybe<GqlItemGroup>>;
  /** A list of items from the c (content) field of the block */
  items: Array<GqlItem>;
  /** The value of nextToken at the start of this block */
  nt: Scalars['Int'];
  /** The length in bytes of the succinct representation of nt (nextToken at the start of the block) */
  ntBL: Scalars['Int'];
  /** A list of open scopes for this block */
  os: Array<GqlItem>;
  /** The length in bytes of the succinct representation of os (open scopes) */
  osBL: Scalars['Int'];
  /** The number of items in the succinct representation of os (open scopes) */
  osL: Scalars['Int'];
  /** A list of the labels for the block\'s bs, os and is scopes */
  scopeLabels: Array<Scalars['String']>;
  /** The text of the block as a single string */
  text: Scalars['String'];
  /** A list of tokens from the c (content) field of the block */
  tokens: Array<GqlItem>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
type GqlBlockItemGroupsArgs = {
  byMilestones: InputMaybe<Array<Scalars['String']>>;
  byScopes: InputMaybe<Array<Scalars['String']>>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
type GqlBlockItemsArgs = {
  anyScope: InputMaybe<Scalars['Boolean']>;
  includeContext: InputMaybe<Scalars['Boolean']>;
  withScopes: InputMaybe<Array<Scalars['String']>>;
  withScriptureCV: InputMaybe<Scalars['String']>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
type GqlBlockScopeLabelsArgs = {
  startsWith: InputMaybe<Array<Scalars['String']>>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
type GqlBlockTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
  withScriptureCV: InputMaybe<Scalars['String']>;
};


/** Part of a sequence, roughly equivalent to a USFM paragraph */
type GqlBlockTokensArgs = {
  anyScope: InputMaybe<Scalars['Boolean']>;
  includeContext: InputMaybe<Scalars['Boolean']>;
  withChars: InputMaybe<Array<Scalars['String']>>;
  withMatchingChars: InputMaybe<Array<Scalars['String']>>;
  withScopes: InputMaybe<Array<Scalars['String']>>;
  withScriptureCV: InputMaybe<Scalars['String']>;
  withSubTypes: InputMaybe<Array<Scalars['String']>>;
};

/** A collection of documents that share the same set of selector values */
type GqlDocSet = {
  __typename?: 'DocSet';
  /** A document in the docSet, if present */
  document: Maybe<GqlDocument>;
  /** The documents in the docSet */
  documents: Array<GqlDocument>;
  /** The internal index number corresponding to a string in a given docSet enum */
  enumIndexForString: Scalars['Int'];
  /** Information about internal indexes matching the case-insensitive regex in a given docSet enum */
  enumRegexIndexesForString: Array<GqlRegexIndex>;
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
  selectors: Array<GqlKeyValue>;
  /** A list of the tags of this docSet */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this docSet as key/value tuples */
  tagsKv: Array<GqlKeyValue>;
  /** A list of unique characters in the docSet */
  uniqueChars: Array<Scalars['String']>;
  /** A string containing the unique characters in the docSet */
  uniqueCharsString: Scalars['String'];
  /** A list of wordLike token strings in the docSet */
  wordLikes: Array<Scalars['String']>;
};


/** A collection of documents that share the same set of selector values */
type GqlDocSetDocumentArgs = {
  bookCode: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
type GqlDocSetDocumentsArgs = {
  allChars: InputMaybe<Scalars['Boolean']>;
  allScopes: InputMaybe<Scalars['Boolean']>;
  ids: InputMaybe<Array<Scalars['String']>>;
  sortedBy: InputMaybe<Scalars['String']>;
  withChars: InputMaybe<Array<Scalars['String']>>;
  withHeaderValues: InputMaybe<Array<GqlInputKeyValue>>;
  withMatchingChars: InputMaybe<Array<Scalars['String']>>;
  withScopes: InputMaybe<Array<Scalars['String']>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};


/** A collection of documents that share the same set of selector values */
type GqlDocSetEnumIndexForStringArgs = {
  enumType: Scalars['String'];
  searchString: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
type GqlDocSetEnumRegexIndexesForStringArgs = {
  enumType: Scalars['String'];
  searchRegex: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
type GqlDocSetHasTagArgs = {
  tagName: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
type GqlDocSetSelectorArgs = {
  id: Scalars['String'];
};


/** A collection of documents that share the same set of selector values */
type GqlDocSetWordLikesArgs = {
  coerceCase: InputMaybe<Scalars['String']>;
};

/** A document, typically corresponding to USFM for one book */
type GqlDocument = {
  __typename?: 'Document';
  /** The content of a chapter */
  cIndex: GqlCIndex;
  /** The content of the main sequence indexed by chapter */
  cIndexes: Array<Maybe<GqlCIndex>>;
  /** Content for a Scripture reference within this document, using local versification */
  cv: Array<GqlItemGroup>;
  /** The content of the specified chapter indexed by chapterVerse */
  cvIndex: GqlCvIndex;
  /** The content of the main sequence indexed by chapterVerse */
  cvIndexes: Array<Maybe<GqlCvIndex>>;
  /** Verses matching the arguments */
  cvMatching: Array<GqlItemGroup>;
  /** What's previous and next with respect to the specified verse */
  cvNavigation: Maybe<GqlCvNavigation>;
  /** The id of the docSet to which this document belongs */
  docSetId: Scalars['String'];
  /** 'Whether or not the document has the specified tag */
  hasTag: Scalars['Boolean'];
  /** One USFM header */
  header: Maybe<Scalars['String']>;
  /** USFM header information such as TOC */
  headers: Array<GqlKeyValue>;
  /** The id of the document */
  id: Scalars['String'];
  /** A parsed version of the id header */
  idParts: GqlIdParts;
  /** The key-value sequence with the specified id */
  kvSequence: Maybe<GqlKvSequence>;
  /** A list of key-value sequences for this document */
  kvSequences: Array<GqlKvSequence>;
  /** The blocks of the main sequence */
  mainBlocks: Array<GqlBlock>;
  /** The items for each block of the main sequence */
  mainBlocksItems: Array<Array<GqlItem>>;
  /** The text for each block of the main sequence */
  mainBlocksText: Array<Scalars['String']>;
  /** The tokens for each block of the main sequence */
  mainBlocksTokens: Array<Array<GqlItem>>;
  /** The main sequence */
  mainSequence: GqlSequence;
  /** The text for the main sequence */
  mainText: Scalars['String'];
  /** Content for a Scripture reference within this document, using the versification of the specified docSet */
  mappedCv: Array<GqlItemGroup>;
  /** Content for each verse of a chapter within this document, using the versification of the specified docSet */
  mappedCvs: Array<Array<GqlItemGroup>>;
  /** The number of sequences */
  nSequences: Scalars['Int'];
  /** A string of PERF JSON for this document */
  perf: Scalars['String'];
  /** The sequence with the specified id */
  sequence: Maybe<GqlSequence>;
  /** A list of sequences for this document */
  sequences: Array<GqlSequence>;
  /** The table sequence with the specified id */
  tableSequence: Maybe<GqlTableSequence>;
  /** A list of table sequences for this document */
  tableSequences: Array<GqlTableSequence>;
  /** A list of the tags of this document */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this document as key/value tuples */
  tagsKv: Array<GqlKeyValue>;
  /** A list of text (ie non-table, non-tree, non-kv) sequences for this document */
  textSequences: Array<GqlSequence>;
  /** The tree sequence with the specified id */
  treeSequence: Maybe<GqlTreeSequence>;
  /** A list of tree sequences for this document */
  treeSequences: Array<GqlTreeSequence>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentCIndexArgs = {
  chapter: Scalars['Int'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentCvArgs = {
  chapter: InputMaybe<Scalars['String']>;
  chapterVerses: InputMaybe<Scalars['String']>;
  includeContext: InputMaybe<Scalars['Boolean']>;
  verses: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentCvIndexArgs = {
  chapter: Scalars['Int'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentCvMatchingArgs = {
  allChars: InputMaybe<Scalars['Boolean']>;
  allScopes: InputMaybe<Scalars['Boolean']>;
  withChars: InputMaybe<Array<Scalars['String']>>;
  withMatchingChars: InputMaybe<Array<Scalars['String']>>;
  withScopes: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentCvNavigationArgs = {
  chapter: Scalars['String'];
  verse: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentHasTagArgs = {
  tagName: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentHeaderArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentKvSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentKvSequencesArgs = {
  ids: InputMaybe<Array<Scalars['String']>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentMainBlocksTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentMainTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentMappedCvArgs = {
  chapter: Scalars['String'];
  includeContext: InputMaybe<Scalars['Boolean']>;
  mappedDocSetId: Scalars['String'];
  verses: Array<Scalars['String']>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentMappedCvsArgs = {
  chapter: Scalars['String'];
  includeContext: InputMaybe<Scalars['Boolean']>;
  mappedDocSetId: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentPerfArgs = {
  indent: InputMaybe<Scalars['Int']>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentSequencesArgs = {
  ids: InputMaybe<Array<Scalars['String']>>;
  types: InputMaybe<Array<Scalars['String']>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentTableSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentTableSequencesArgs = {
  ids: InputMaybe<Array<Scalars['String']>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentTextSequencesArgs = {
  ids: InputMaybe<Array<Scalars['String']>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentTreeSequenceArgs = {
  id: Scalars['String'];
};


/** A document, typically corresponding to USFM for one book */
type GqlDocumentTreeSequencesArgs = {
  ids: InputMaybe<Array<Scalars['String']>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};

/** Item for arguments */
type GqlInputItemObject = {
  /** The content of the item (the text for tokens, the label for scopes and the sequence id for grafts) */
  payload: Scalars['String'];
  /** The type-dependent subtype of the item */
  subType: Scalars['String'];
  /** The basic item type (token, scope or graft)' */
  type: Scalars['String'];
};

/** Input Key/Value Object */
type GqlInputKeyValue = {
  /** The key */
  key: Scalars['String'];
  /** The value */
  value: Scalars['String'];
};

/** Item */
type GqlItem = {
  __typename?: 'Item';
  /** The content of the item (the text for tokens, the label for scopes and the sequence id for grafts) */
  payload: Scalars['String'];
  /** If 'includeContext' was selected, and for tokens, the index of the token from the start of the sequence */
  position: Maybe<Scalars['Int']>;
  /** If 'includeContext' was selected, a list of scopes that are open around the item */
  scopes: Maybe<Array<Scalars['String']>>;
  /** The type-dependent subtype of the item */
  subType: Scalars['String'];
  /** The basic item type (token, scope or graft) */
  type: Scalars['String'];
};


/** Item */
type GqlItemPayloadArgs = {
  excludeChars: InputMaybe<Array<Scalars['String']>>;
  includeChars: InputMaybe<Array<Scalars['String']>>;
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


/** Item */
type GqlItemPositionArgs = {
  startsWith: InputMaybe<Array<Scalars['String']>>;
};


/** Item */
type GqlItemScopesArgs = {
  startsWith: InputMaybe<Array<Scalars['String']>>;
};

/** A collection of items, with scope context */
type GqlItemGroup = {
  __typename?: 'ItemGroup';
  /** The itemGroup content as a string in a compact eyeballable format */
  dump: Scalars['String'];
  /** A list of scopes from the items of the itemGroup */
  includedScopes: Array<Scalars['String']>;
  /** Items for this itemGroup */
  items: Array<GqlItem>;
  /** The labels of scopes that were open at the beginning of the itemGroup */
  scopeLabels: Array<Scalars['String']>;
  /** The text of the itemGroup as a single string */
  text: Scalars['String'];
  /** Tokens for this itemGroup */
  tokens: Array<GqlItem>;
};


/** A collection of items, with scope context */
type GqlItemGroupScopeLabelsArgs = {
  startsWith: InputMaybe<Array<Scalars['String']>>;
};


/** A collection of items, with scope context */
type GqlItemGroupTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


/** A collection of items, with scope context */
type GqlItemGroupTokensArgs = {
  withChars: InputMaybe<Array<Scalars['String']>>;
  withSubTypes: InputMaybe<Array<Scalars['String']>>;
};

/** Key/Regex tuple */
type GqlKeyMatches = {
  /** The key */
  key: Scalars['String'];
  /** The regex to match */
  matches: Scalars['String'];
};

/** Key/Value tuple */
type GqlKeyValue = {
  __typename?: 'KeyValue';
  /** The key */
  key: Scalars['String'];
  /** The value */
  value: Scalars['String'];
};

/** Input Key/Values Object */
type GqlKeyValues = {
  /** The key */
  key: Scalars['String'];
  /** The values */
  values: Array<Scalars['String']>;
};

type GqlMutation = {
  __typename?: 'Mutation';
  /** Add one or more tags to a docSet, if they are not already present */
  addDocSetTags: Array<Scalars['String']>;
  /** Adds a document which will be assigned to an existing or new docSet on the basis of the specified selectors */
  addDocument: Scalars['Boolean'];
  /** Add one or more tags to a document, if they are not already present */
  addDocumentTags: Maybe<Array<Scalars['String']>>;
  /** Add one or more tags to a sequence, if they are not already present */
  addSequenceTags: Maybe<Array<Scalars['String']>>;
  /** Deletes a block from a sequence */
  deleteBlock: Maybe<Scalars['Boolean']>;
  /** Deletes a docSet */
  deleteDocSet: Maybe<Scalars['Boolean']>;
  /** Deletes a document */
  deleteDocument: Maybe<Scalars['Boolean']>;
  /** Deletes a sequence from a document */
  deleteSequence: Maybe<Scalars['Boolean']>;
  /** Garbage collects unused sequences within a document. (You probably don\'t need to do this.) */
  gcSequences: Scalars['Boolean'];
  /** Adds a new block to a sequence */
  newBlock: Scalars['Boolean'];
  /** Creates a new, empty sequence */
  newSequence: Scalars['String'];
  /** Explicitly rebuild the text lookup tables for a docSet. (You probably don't need to do this) */
  rehashDocSet: Scalars['Boolean'];
  /** Remove one or more tags from a docSet, if they are present */
  removeDocSetTags: Maybe<Array<Scalars['String']>>;
  /** Remove one or more tags from a document, if they are present */
  removeDocumentTags: Maybe<Array<Scalars['String']>>;
  /** Remove one or more tags from a sequence, if they are present */
  removeSequenceTags: Maybe<Array<Scalars['String']>>;
  /** Adds verse mapping tables to the documents in a docSet, where the verse mapping may be provided in legacy .vrs or JSON format */
  setVerseMapping: Scalars['Boolean'];
  /** Removes verse mapping tables from the documents in a docSet */
  unsetVerseMapping: Scalars['Boolean'];
  /** Replaces all the blocks of a sequence with a new set of blocks */
  updateAllBlocks: Scalars['Boolean'];
  /** Replaces the items of a block with a new set of items */
  updateItems: Scalars['Boolean'];
};


type GqlMutationAddDocSetTagsArgs = {
  docSetId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


type GqlMutationAddDocumentArgs = {
  content: Scalars['String'];
  contentType: Scalars['String'];
  selectors: Array<GqlInputKeyValue>;
  tags: InputMaybe<Array<Scalars['String']>>;
};


type GqlMutationAddDocumentTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


type GqlMutationAddSequenceTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


type GqlMutationDeleteBlockArgs = {
  blockN: Scalars['Int'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
};


type GqlMutationDeleteDocSetArgs = {
  docSetId: Scalars['String'];
};


type GqlMutationDeleteDocumentArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
};


type GqlMutationDeleteSequenceArgs = {
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
};


type GqlMutationGcSequencesArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
};


type GqlMutationNewBlockArgs = {
  blockN: Scalars['Int'];
  blockScope: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
};


type GqlMutationNewSequenceArgs = {
  blocksSpec: InputMaybe<Array<GqlInputBlockSpec>>;
  documentId: Scalars['String'];
  graftToMain: InputMaybe<Scalars['Boolean']>;
  tags: InputMaybe<Array<Scalars['String']>>;
  type: Scalars['String'];
};


type GqlMutationRehashDocSetArgs = {
  docSetId: Scalars['String'];
};


type GqlMutationRemoveDocSetTagsArgs = {
  docSetId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


type GqlMutationRemoveDocumentTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


type GqlMutationRemoveSequenceTagsArgs = {
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId: Scalars['String'];
  tags: Array<InputMaybe<Scalars['String']>>;
};


type GqlMutationSetVerseMappingArgs = {
  docSetId: Scalars['String'];
  jsonSource: InputMaybe<Scalars['String']>;
  vrsSource: InputMaybe<Scalars['String']>;
};


type GqlMutationUnsetVerseMappingArgs = {
  docSetId: Scalars['String'];
};


type GqlMutationUpdateAllBlocksArgs = {
  blocksSpec: Array<GqlInputBlockSpec>;
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  sequenceId: InputMaybe<Scalars['String']>;
};


type GqlMutationUpdateItemsArgs = {
  blockGrafts: InputMaybe<Array<GqlInputItemObject>>;
  blockPosition: Scalars['Int'];
  blockScope: InputMaybe<GqlInputItemObject>;
  docSetId: Scalars['String'];
  documentId: Scalars['String'];
  items: InputMaybe<Array<GqlInputItemObject>>;
  sequenceId: InputMaybe<Scalars['String']>;
};

/** The top level of Proskomma queries */
type GqlQuery = {
  __typename?: 'Query';
  /** The docSet with the specified id */
  docSet: Maybe<GqlDocSet>;
  /** The docSets in the processor */
  docSets: Array<GqlDocSet>;
  /** The document with the specified id, or the specified docSet and withBook */
  document: Maybe<GqlDocument>;
  /** The documents in the processor */
  documents: Array<GqlDocument>;
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
  selectors: Array<GqlSelectorSpec>;
};


/** The top level of Proskomma queries */
type GqlQueryDocSetArgs = {
  id: Scalars['String'];
};


/** The top level of Proskomma queries */
type GqlQueryDocSetsArgs = {
  ids: InputMaybe<Array<Scalars['String']>>;
  withBook: InputMaybe<Scalars['String']>;
  withSelectors: InputMaybe<Array<GqlInputKeyValue>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};


/** The top level of Proskomma queries */
type GqlQueryDocumentArgs = {
  docSetId: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['String']>;
  withBook: InputMaybe<Scalars['String']>;
};


/** The top level of Proskomma queries */
type GqlQueryDocumentsArgs = {
  ids: InputMaybe<Array<Scalars['String']>>;
  sortedBy: InputMaybe<Scalars['String']>;
  withBook: InputMaybe<Scalars['String']>;
  withHeaderValues: InputMaybe<Array<GqlInputKeyValue>>;
  withTags: InputMaybe<Array<Scalars['String']>>;
  withoutTags: InputMaybe<Array<Scalars['String']>>;
};

/** A contiguous flow of content */
type GqlSequence = {
  __typename?: 'Sequence';
  /** The blocks in the sequence */
  blocks: Array<GqlBlock>;
  /** The items for each block in the sequence */
  blocksItems: Maybe<Array<Array<GqlItem>>>;
  /** The text for each block in the sequence */
  blocksText: Maybe<Array<Scalars['String']>>;
  /** The tokens for each block in the sequence */
  blocksTokens: Maybe<Array<Array<GqlItem>>>;
  /** Returns true if a main sequence contains the specified tokens */
  hasChars: Scalars['Boolean'];
  /** Returns true if a main sequence contains a match for specified regexes */
  hasMatchingChars: Scalars['Boolean'];
  /** Whether or not the sequence has the specified tag */
  hasTag: Scalars['Boolean'];
  /** The id of the sequence */
  id: Scalars['String'];
  /** Sequence content grouped by scopes or milestones */
  itemGroups: Array<GqlItemGroup>;
  /** The number of blocks in the sequence */
  nBlocks: Scalars['Int'];
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<GqlKeyValue>;
  /** The text for the sequence */
  text: Scalars['String'];
  /** The type of the sequence (main, heading...) */
  type: Scalars['String'];
  /** A list of wordLike token strings in a main sequence */
  wordLikes: Array<Scalars['String']>;
};


/** A contiguous flow of content */
type GqlSequenceBlocksArgs = {
  allAtts: InputMaybe<Scalars['Boolean']>;
  allChars: InputMaybe<Scalars['Boolean']>;
  attSpecs: InputMaybe<Array<Array<GqlAttSpec>>>;
  attValues: InputMaybe<Array<Array<Scalars['String']>>>;
  positions: InputMaybe<Array<Scalars['Int']>>;
  withBlockScope: InputMaybe<Scalars['String']>;
  withChars: InputMaybe<Array<Scalars['String']>>;
  withMatchingChars: InputMaybe<Array<Scalars['String']>>;
  withScopes: InputMaybe<Array<Scalars['String']>>;
  withScriptureCV: InputMaybe<Scalars['String']>;
};


/** A contiguous flow of content */
type GqlSequenceBlocksTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


/** A contiguous flow of content */
type GqlSequenceHasCharsArgs = {
  allChars: InputMaybe<Scalars['Boolean']>;
  chars: InputMaybe<Array<Scalars['String']>>;
};


/** A contiguous flow of content */
type GqlSequenceHasMatchingCharsArgs = {
  allChars: InputMaybe<Scalars['Boolean']>;
  chars: InputMaybe<Array<Scalars['String']>>;
};


/** A contiguous flow of content */
type GqlSequenceHasTagArgs = {
  tagName: Scalars['String'];
};


/** A contiguous flow of content */
type GqlSequenceItemGroupsArgs = {
  byMilestones: InputMaybe<Array<Scalars['String']>>;
  byScopes: InputMaybe<Array<Scalars['String']>>;
};


/** A contiguous flow of content */
type GqlSequenceTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


/** A contiguous flow of content */
type GqlSequenceWordLikesArgs = {
  coerceCase: InputMaybe<Scalars['String']>;
};

/** A chapter index entry */
type GqlCIndex = {
  __typename?: 'cIndex';
  /** The chapter number */
  chapter: Scalars['Int'];
  /** The items as a string in a compact eyeballable format */
  dumpItems: Maybe<Scalars['String']>;
  /** The zero-indexed number of the block where the chapter ends */
  endBlock: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the chapter ends */
  endItem: Maybe<Scalars['Int']>;
  /** A list of items for this chapter */
  items: Array<Maybe<GqlItem>>;
  /** The value of nextToken at the beginning of the chapter */
  nextToken: Maybe<Scalars['Int']>;
  /** The zero-indexed number of the block where the chapter starts */
  startBlock: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the chapter starts */
  startItem: Maybe<Scalars['Int']>;
  /** The text of the chapter as a single string */
  text: Scalars['String'];
  /** A list of tokens for this chapter */
  tokens: Array<Maybe<GqlItem>>;
};


/** A chapter index entry */
type GqlCIndexItemsArgs = {
  includeContext: InputMaybe<Scalars['Boolean']>;
};


/** A chapter index entry */
type GqlCIndexTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


/** A chapter index entry */
type GqlCIndexTokensArgs = {
  includeContext: InputMaybe<Scalars['Boolean']>;
  withChars: InputMaybe<Array<Scalars['String']>>;
  withSubTypes: InputMaybe<Array<Scalars['String']>>;
};

/** A table cell */
type GqlCell = {
  __typename?: 'cell';
  /** The column numbers */
  columns: Array<Scalars['Int']>;
  /** A list of items from the c (content) field of the cell */
  items: Array<GqlItem>;
  /** The row numbers */
  rows: Array<Scalars['Int']>;
  /** The text of the cell as a single string */
  text: Scalars['String'];
  /** A list of tokens from the c (content) field of the cell */
  tokens: Array<GqlItem>;
};


/** A table cell */
type GqlCellTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};

/** A chapter-verse reference */
type GqlCv = {
  __typename?: 'cv';
  /** The chapter number */
  chapter: Maybe<Scalars['Int']>;
  /** The verse number */
  verse: Maybe<Scalars['Int']>;
};

/** A chapterVerse index entry */
type GqlCvIndex = {
  __typename?: 'cvIndex';
  /** The chapter number */
  chapter: Scalars['Int'];
  /** A list of verse number and range information, organized by verse number */
  verseNumbers: Maybe<Array<GqlVerseNumber>>;
  /** A list of verse number and range information, organized by verse range */
  verseRanges: Maybe<Array<GqlVerseRange>>;
  /** Information about the verses in the chapter */
  verses: Maybe<Array<Maybe<GqlCvVerses>>>;
};

/** Various answers to 'previous' and 'next' with respect to a verse */
type GqlCvNavigation = {
  __typename?: 'cvNavigation';
  /** The next chapter number (as a string) */
  nextChapter: Maybe<Scalars['String']>;
  /** The verse number for the next verse */
  nextVerse: Maybe<GqlCv>;
  /** The verse number for the next verse range */
  nextVerseRangeVerse: Maybe<GqlCv>;
  /** The previous chapter number (as a string) */
  previousChapter: Maybe<Scalars['String']>;
  /** The verse number for the previous verse */
  previousVerse: Maybe<GqlCv>;
  /** The verse number for the previous verse range */
  previousVerseRangeVerse: Maybe<GqlCv>;
};

type GqlCvVerseElement = {
  __typename?: 'cvVerseElement';
  /** The items as a string in a compact eyeballable format */
  dumpItems: Maybe<Scalars['String']>;
  /** The zero-indexed number of the block where the verse ends */
  endBlock: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the verse ends */
  endItem: Maybe<Scalars['Int']>;
  /** A list of items for this verse */
  items: Array<Maybe<GqlItem>>;
  /** The value of nextToken at the beginning of the verse */
  nextToken: Maybe<Scalars['Int']>;
  /** The zero-indexed number of the block where the verse starts */
  startBlock: Maybe<Scalars['Int']>;
  /** The zero-indexed position of the item where the verse starts */
  startItem: Maybe<Scalars['Int']>;
  /** The text of the verse as a single string */
  text: Scalars['String'];
  /** A list of tokens for this verse */
  tokens: Array<Maybe<GqlItem>>;
  /** The verse range for this verse as it would be printed in a Bible */
  verseRange: Maybe<Scalars['String']>;
};


type GqlCvVerseElementItemsArgs = {
  includeContext: InputMaybe<Scalars['Boolean']>;
};


type GqlCvVerseElementTextArgs = {
  normalizeSpace: InputMaybe<Scalars['Boolean']>;
};


type GqlCvVerseElementTokensArgs = {
  includeContext: InputMaybe<Scalars['Boolean']>;
  withChars: InputMaybe<Array<Scalars['String']>>;
  withSubTypes: InputMaybe<Array<Scalars['String']>>;
};

/** Information about a verse in the chapter, which may be split into several pieces */
type GqlCvVerses = {
  __typename?: 'cvVerses';
  /** The pieces of verse */
  verse: Maybe<Array<Maybe<GqlCvVerseElement>>>;
};

/** Type-dependent parts of the ID header */
type GqlIdParts = {
  __typename?: 'idParts';
  /** A part of the ID, by index */
  part: Maybe<Scalars['String']>;
  /** An array of parts of the ID */
  parts: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The type of the ID */
  type: Maybe<Scalars['String']>;
};


/** Type-dependent parts of the ID header */
type GqlIdPartsPartArgs = {
  index: Scalars['Int'];
};

/** A specification to create or update a block */
type GqlInputBlockSpec = {
  /** The block grafts as items */
  bg: Array<GqlInputItemObject>;
  /** The block scope as an item */
  bs: GqlInputItemObject;
  /** The included scopes as items */
  is: Array<GqlInputItemObject>;
  /** The items */
  items: Array<GqlInputItemObject>;
  /** The open scopes as items */
  os: Array<GqlInputItemObject>;
};

/** Input specification of a selector */
type GqlInputSelectorSpec = {
  /** Enum of permitted string values */
  enum: InputMaybe<Array<Scalars['String']>>;
  /** Inclusive maximum value for integer selector */
  max: InputMaybe<Scalars['String']>;
  /** Inclusive minimum value for integer selector */
  min: InputMaybe<Scalars['String']>;
  /** Name (ie the key) */
  name: Scalars['String'];
  /** Regex for validating string selector */
  regex: InputMaybe<Scalars['String']>;
  /** Data type (string or integer) */
  type: Scalars['String'];
};

/** Key/Items tuple */
type GqlKvEntry = {
  __typename?: 'kvEntry';
  /** The fields as itemGroups */
  itemGroups: Array<Maybe<GqlItemGroup>>;
  /** The key */
  key: Scalars['String'];
  /** The secondary keys */
  secondaryKeys: Maybe<Array<GqlKeyValue>>;
};

/** A contiguous flow of content for key-values */
type GqlKvSequence = {
  __typename?: 'kvSequence';
  /** The entries in the key-value sequence */
  entries: Maybe<Array<GqlKvEntry>>;
  /** Whether or not the sequence has the specified tag */
  hasTag: Scalars['Boolean'];
  /** The id of the sequence */
  id: Scalars['String'];
  /** The number of entries in the key-value sequence */
  nEntries: Scalars['Int'];
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<GqlKeyValue>;
};


/** A contiguous flow of content for key-values */
type GqlKvSequenceEntriesArgs = {
  contentEquals: InputMaybe<Array<GqlKeyValues>>;
  contentMatches: InputMaybe<Array<GqlKeyMatches>>;
  keyEquals: InputMaybe<Array<Scalars['String']>>;
  keyMatches: InputMaybe<Scalars['String']>;
  secondaryEquals: InputMaybe<Array<GqlKeyValues>>;
  secondaryMatches: InputMaybe<Array<GqlKeyMatches>>;
};


/** A contiguous flow of content for key-values */
type GqlKvSequenceHasTagArgs = {
  tagName: InputMaybe<Scalars['String']>;
};

/** A tree node */
type GqlNode = {
  __typename?: 'node';
  /** The node children ids */
  childIds: Array<Scalars['String']>;
  /** The node id */
  id: Scalars['String'];
  /** The content as itemGroups */
  itemGroups: Array<GqlItemGroup>;
  /** The keys for content */
  keys: Array<Scalars['String']>;
  /** The node parent id */
  parentId: Maybe<Scalars['String']>;
};


/** A tree node */
type GqlNodeItemGroupsArgs = {
  includeContext: InputMaybe<Scalars['Boolean']>;
};

/** Mapped verse information */
type GqlOrig = {
  __typename?: 'orig';
  /** The book code */
  book: Maybe<Scalars['String']>;
  /** A list of chapter-verse references */
  cvs: Array<GqlCv>;
};

/** Information about a regex match on an enum */
type GqlRegexIndex = {
  __typename?: 'regexIndex';
  /** The index in the enum */
  index: Scalars['String'];
  /** The string in the enum that matched */
  matched: Scalars['String'];
};

/** Row Equals Specification */
type GqlRowEqualsSpec = {
  /** The position of the column in which to search a match */
  colN: Scalars['Int'];
  /** The values to match */
  values: Array<Scalars['String']>;
};

/** Row Match Specification */
type GqlRowMatchSpec = {
  /** The position of the column in which to search a match */
  colN: Scalars['Int'];
  /** The regex to match */
  matching: Scalars['String'];
};

/** Specification of a selector */
type GqlSelectorSpec = {
  __typename?: 'selectorSpec';
  /** Enum of permitted string values */
  enum: Maybe<Array<Scalars['String']>>;
  /** Inclusive maximum value for integer selector */
  max: Maybe<Scalars['String']>;
  /** Inclusive minimum value for integer selector */
  min: Maybe<Scalars['String']>;
  /** Name (ie the key) */
  name: Scalars['String'];
  /** Regex for validating string selector */
  regex: Maybe<Scalars['String']>;
  /** Data type (string or integer) */
  type: Scalars['String'];
};

/** A contiguous flow of content for a table */
type GqlTableSequence = {
  __typename?: 'tableSequence';
  /** The cells in the table sequence */
  cells: Array<GqlCell>;
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
  rows: Array<Array<GqlCell>>;
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<GqlKeyValue>;
};


/** A contiguous flow of content for a table */
type GqlTableSequenceHasTagArgs = {
  tagName: InputMaybe<Scalars['String']>;
};


/** A contiguous flow of content for a table */
type GqlTableSequenceRowsArgs = {
  columns: InputMaybe<Array<Scalars['Int']>>;
  equals: InputMaybe<Array<GqlRowEqualsSpec>>;
  matches: InputMaybe<Array<GqlRowMatchSpec>>;
  positions: InputMaybe<Array<Scalars['Int']>>;
};

/** The nodes of a tree */
type GqlTreeSequence = {
  __typename?: 'treeSequence';
  /** Whether or not the sequence has the specified tag */
  hasTag: Scalars['Boolean'];
  /** The id of the sequence */
  id: Scalars['String'];
  /** The number of nodes in the tree sequence */
  nNodes: Scalars['Int'];
  /** The nodes in the tree sequence */
  nodes: Array<GqlNode>;
  /** A list of the tags of this sequence */
  tags: Array<Scalars['String']>;
  /** A list of the tags of this sequence as key/value tuples */
  tagsKv: Array<GqlKeyValue>;
  /** The JSON results for the Tribos queries, as an array of strings */
  triboi: Array<Scalars['String']>;
  /** The JSON result for a Tribos query, as a string */
  tribos: Scalars['String'];
  /** Tribos documentation */
  tribosDoc: Scalars['String'];
};


/** The nodes of a tree */
type GqlTreeSequenceHasTagArgs = {
  tagName: InputMaybe<Scalars['String']>;
};


/** The nodes of a tree */
type GqlTreeSequenceTriboiArgs = {
  queries: Array<Scalars['String']>;
};


/** The nodes of a tree */
type GqlTreeSequenceTribosArgs = {
  query: Scalars['String'];
};

/** Information about a verse number (which may be part of a verse range) */
type GqlVerseNumber = {
  __typename?: 'verseNumber';
  /** The verse number */
  number: Scalars['Int'];
  /** The reference for this verse when mapped to 'original' versification */
  orig: GqlOrig;
  /** The verse range to which the verse number belongs */
  range: Scalars['String'];
};

/** Information about a verse range (which may only cover one verse) */
type GqlVerseRange = {
  __typename?: 'verseRange';
  /** A list of verse numbers for this range */
  numbers: Array<Scalars['Int']>;
  /** The range, as it would be printed in a Bible */
  range: Scalars['String'];
};
