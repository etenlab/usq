#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { USFMParser } from 'usfm-grammar';
import { Pool, PoolClient } from 'pg';

import { getInsertParameters, insertWord } from './db';

const defaultCollection = {
  languageIndex: "_fake_index_1",
  languageId: 1,
  collectionName: "us_ENG"
}

const defaultClient = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
  idleTimeoutMillis: 0
};

async function parseFile(client: PoolClient, path: string) {

  console.log(`Starting file ${path}`);

  const content = await readFile(path, 'utf8');
  const parser = new USFMParser(content);
  const json = parser.toJSON();

  const inserts = getInsertParameters(defaultCollection, json);
  const total = inserts.length;
  let completed = 0;

  const spinner = ['\\', '|', '/', '-'];
  let spinnerIdx = 0;
  for (const params of inserts) {
    process.stdout.write(`\r[${++completed}/${total}] ${spinner[(spinnerIdx++) % spinner.length]} ${params.word}`);
    await insertWord(client, params);
  }
  process.stdout.write('\n');

}

async function main() {
  const inputFiles = process.argv.slice(2);

  if (inputFiles.length > 0) {
    const pool = new Pool(defaultClient);
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      for (const input of inputFiles) {
        await ingestFile(client, input);
      }
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } else {
    console.log("nothing to do");
  }

  process.exit(0);
}

main()
  .catch(e => {
    console.log();
    console.log(e);
    process.exit(1);
  });
