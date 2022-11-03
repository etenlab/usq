#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { USFMParser } from 'usfm-grammar';
import { Pool, PoolClient } from 'pg';

import { getInsertParameters, insertWord } from './db';

import options from './options';


async function parseFile(path: string) {
  const content = await readFile(path, 'utf8');
  const parser = new USFMParser(content);
  return parser.toJSON();
}

async function ingestFile(client: PoolClient, path: string) {

  console.log(`Starting file ${path}`);

  const json = await parseFile(path);

  const inserts = getInsertParameters(options.collectionConfig, json);
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
  const inputFiles = options.inputFiles;

  if (inputFiles.length > 0) {
    const pool = new Pool(options.dbConfig);
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

options.initialize().then(() => {
  main()
    .catch(e => {
      console.log();
      console.log(e);
      process.exit(1);
    });
});
