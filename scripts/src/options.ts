import { PoolConfig } from "pg";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

import { ICollectionParameters } from "./db";

dotenv.config();

const DEFAULT_DB_CONFIG: PoolConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
  idleTimeoutMillis: 0
};

const DEFAULT_COLLECTION = {
  languageIndex: "_fake_index_1",
  languageId: 1,
  collectionName: "us_ENG"
};

const DEFAULT_REGEXES = {
  word: /[\w’]+/,
  token: /([\w’]+)|([^\s\w’]+)/g
};

const opts = yargs(hideBin(process.argv))
  .env('USQ')
  .option('postgres-user', {
    alias: 'u',
    default: DEFAULT_DB_CONFIG.user,
    type: 'string',
    description: 'User to connect to postgres as'
  })
  .option('postgres-host', {
    alias: 'h',
    default: DEFAULT_DB_CONFIG.host,
    type: 'string',
    description: 'Host to use to connect to postgres'
  })
  .option('postgres-database', {
    alias: 'd',
    default: DEFAULT_DB_CONFIG.database,
    type: 'string',
    description: 'Postgres database to connect to'
  })
  .option('postgres-password', {
    alias: 's',
    default: DEFAULT_DB_CONFIG.password,
    type: 'string',
    description: 'Password to use to connect to postgres'
  })
  .option('postgres-port', {
    alias: 'p',
    default: DEFAULT_DB_CONFIG.port,
    type: 'number',
    description: 'Port to use to connect to postgres'
  })
  .group(['postgres-user', 'postgres-host', 'postgres-database', 'postgres-password', 'postgres-port'], 'Database Connection')
  .option('language-index', {
    alias: 'l',
    default: DEFAULT_COLLECTION.languageIndex,
    type: 'string',
    description: 'Name of the language this edition is in'
  })
  .option('language-id', {
    alias: 'i',
    default: DEFAULT_COLLECTION.languageId,
    type: 'number',
    description: 'ID of the language this edition is in'
  })
  .option('collection-name', {
    alias: 'n',
    default: DEFAULT_COLLECTION.collectionName,
    type: 'string',
    description: 'Name of the collection this edition is from'
  })
  .group(['language-index', 'language-id', 'collection-name'], 'Collection Information')
  .option('word-regex', {
    alias: 'w',
    type: 'string',
    default: DEFAULT_REGEXES.word.toString(),
    description: 'Regex used to identify a single word'
  })
  .option('token-regex', {
    alias: 't',
    type: 'string',
    default: DEFAULT_REGEXES.token.toString(),
    description: 'Regex used to tokenize a verse. This must be a global regex.'
  })
  .coerce('word-regex', str => new RegExp(str))
  .coerce('token-regex', str => new RegExp(str))
  .group(['word-regex', 'token-regex'], 'Regular Expressions')
  .command('$0 [files..]', 'ingest USFM files', (yargs) => {
    yargs.positional('files', {
      type: 'string',
      description: 'USFM files to ingest'
    })
    .array('files')
    .demandOption('files');
  })
  .help()
  .argv;

class Options {

  public dbConfig: PoolConfig = DEFAULT_DB_CONFIG;
  public collectionConfig: ICollectionParameters = DEFAULT_COLLECTION;
  public regexes: { word: RegExp, token: RegExp } = DEFAULT_REGEXES;
  public inputFiles: string[] = [];

  async initialize() {
    const args = await opts;

    this.inputFiles = args['files'] as string[];

    this.dbConfig = {
      user: args['postgres-user'],
      host: args['postgres-host'],
      database: args['postgres-database'],
      password: args['postgres-password'],
      port: args['postgres-port'],
      idleTimeoutMillis: DEFAULT_DB_CONFIG.idleTimeoutMillis
    };

    this.collectionConfig = {
      languageIndex: args['language-index'],
      languageId: args['language-id'],
      collectionName: args['collection-name']
    };

    this.regexes = {
      word: args['word-regex'] as RegExp,
      token: args['token-regex'] as RegExp
    };

  }

}

const options = new Options();

export default options;
