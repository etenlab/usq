#!/usr/bin/env node

import { Pool, PoolClient } from 'pg';
import { SingleBar } from 'cli-progress';

import { getInsertParameters, insertWord } from './db';
import parseFile from './parser';

import options from './options';

async function ingestFile(client: PoolClient, path: string) {

  console.log(`Starting file ${path}`);

  const json = await parseFile(path);

  const inserts = getInsertParameters(options.collectionConfig, json);
  const total = inserts.length;
  let completed = 0;

  const bar = new SingleBar({
    format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
  });

  bar.start(total, 0);
  for (const params of inserts) {
    await insertWord(client, params);
    bar.increment();
  }

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
