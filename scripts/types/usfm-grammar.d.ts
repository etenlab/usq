declare module 'usfm-grammar' {
  export type BookCode =
    'GEN' | 'EXO' | 'LEV' | 'NUM' | 'DEU' | 'JOS' | 'JDG' |
    'RUT' | '1SA' | '2SA' | '1KI' | '2KI' | '1CH' | '2CH' |
    'EZR' | 'NEH' | 'EST' | 'JOB' | 'PSA' | 'PRO' | 'ECC' |
    'SNG' | 'ISA' | 'JER' | 'LAM' | 'EZK' | 'DAN' | 'HOS' |
    'JOL' | 'AMO' | 'OBA' | 'JON' | 'MIC' | 'NAM' | 'HAB' |
    'ZEP' | 'HAG' | 'ZEC' | 'MAL' | 'MAT' | 'MRK' | 'LUK' |
    'JHN' | 'ACT' | 'ROM' | '1CO' | '2CO' | 'GAL' | 'EPH' |
    'PHP' | 'COL' | '1TH' | '2TH' | '1TI' | '2TI' | 'TIT' |
    'PHM' | 'HEB' | 'JAS' | '1PE' | '2PE' | '1JN' | '2JN' |
    '3JN' | 'JUD' | 'REV' | 'TOB' | 'JDT' | 'ESG' | 'WIS' |
    'SIR' | 'BAR' | 'LJE' | 'S3Y' | 'SUS' | 'BEL' | '1MA' |
    '2MA' | '3MA' | '4MA' | '1ES' | '2ES' | 'MAN' | 'PS2' |
    'ODA' | 'PSS' | 'EZA' | '5EZ' | '6EZ' | 'DAG' | 'PS3' |
    '2BA' | 'LBA' | 'JUB' | 'ENO' | '1MQ' | '2MQ' | '3MQ' |
    'REP' | '4BA' | 'LAO' | 'FRT' | 'BAK' | 'OTH' | 'INT' |
    'CNC' | 'GLO' | 'TDX' | 'NDX';

  export type OtherElement =
    string |
    null |
    { items: OtherElement[] } |
    { ['(^[^ ]+$']: OtherElement };

  export interface IBook {
    bookCode: BookCode;
    description?: string;
    meta?: OtherElement[];
  };

  export interface IVerse {
    verseNumber: string;
    verseText: string;
    contents?: OtherElement[];
  };

  export type ChapterContent =
    IVerse | OtherElement;

  export interface IChapter {
    chapterNumber: number;
    contents: ChapterContent[];
  };

  export interface IUSFMParsedObject {
    book: IBook;
    chapters: IChapter[];
    _messages?: {
      _warnings: string[];
    };
  };

  export class USFMParser {
    constructor(content: string);
    toJSON(): IUSFMParsedObject;
  };
}
