import { PoolConfig } from "pg";
import dotenv from "dotenv";

import { ICollectionParameters } from "./db";

const DEFAULT_DB_CONFIG = {
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

class Options {

  public readonly dbConfig: PoolConfig;
  public readonly collectionConfig: ICollectionParameters;
  public readonly regexes: { word: RegExp, token: RegExp };

  constructor() {
    dotenv.config();

    this.dbConfig = {
      user: process.env.POSTGRES_USER || DEFAULT_DB_CONFIG.user,
      host: process.env.POSTGRES_HOST || DEFAULT_DB_CONFIG.host,
      database: process.env.POSTGRES_DATABASE || DEFAULT_DB_CONFIG.database,
      password: process.env.POSTGRES_PASSWORD || DEFAULT_DB_CONFIG.password,
      port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : DEFAULT_DB_CONFIG.port,
      idleTimeoutMillis: DEFAULT_DB_CONFIG.idleTimeoutMillis
    };

    this.collectionConfig = {
      languageIndex: process.env.LANGUAGE_INDEX || DEFAULT_COLLECTION.languageIndex,
      languageId: process.env.LANGUAGE_ID ? parseInt(process.env.LANGUAGE_ID) : DEFAULT_COLLECTION.languageId,
      collectionName: process.env.COLLECTION_NAME || DEFAULT_COLLECTION.collectionName
    };

    this.regexes = {
      word: process.env.WORD_REGEX ? new RegExp(process.env.WORD_REGEX) : DEFAULT_REGEXES.word,
      token: process.env.TOKEN_REGEX ? new RegExp(process.env.TOKEN_REGEX) : DEFAULT_REGEXES.token
    };

  }

}

const options = new Options();

export default options;
