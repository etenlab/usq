# USQ - Universal Scripture SQL Schema

## Objectives

1. Create an SQL schema that can be used to represent any USFM document in a relational database table structure.
2. The schema should accomodate change management, role based access, discussions, and crowd sourcing.
3. The schema should facilitate the use of SQL queries to answer any type of question regarding 1 or more USFM files.
4. The SQL schema should be architected so that [Hasura](https://hasura.io/) can expose as much searching functionality as possible through GraphQL. There are quirks in the GraphQL API schema conversion process that database schema architects need to be familiar with.
5. Create a system where solutions that previously required a software developer to now be addressable by a DBA.
6. Encode/decode between the tables and USFM needs to be possible but we won't try to reproduce the exact original USFM document.

## Questions that SQL queries should be able to answer

1. What is that text at reference `r`?
2. What is the text from documents [`d1`, `d2`, `d3`] at reference `r`? Include diffs.
3. What is the text from document `d1` using alignment system `a1` and document `d2` using alignment system `a2` at reference `r`?
4. What are the additional resources available in document `d1` at reference `r` that align to document `d2`? 
    - This would be used to link a new document to resources by first linking the new document to a previously-resource-linked document via alignment.

## User Stories

1. As an MTT, I want to view one or more documents at a time while I edit a document so that I can include references to one or more documents in the edits I make.

1. As an MTT, I want to view all edits to a document over time and be able to approve, deny, and discuss each edit before an edit becomes finalized.

## Run scripts

npx ts-node index.ts