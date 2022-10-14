#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { USFMParser } from 'usfm-grammar';
import { Pool } from 'pg';

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

async function parseFile(path: string) {

    console.log(`Starting file ${path}`);

    const content = await readFile(path, 'utf8');
    const parser = new USFMParser(content);
    const json = parser.toJSON();

    const inserts = getInsertParameters(defaultCollection, json);
    const total = inserts.length;
    let   completed = 0;

    const client = new Pool(defaultClient);
    await client.connect();


    const spinner = [ '\\', '|', '/', '-' ];
    let spinnerIdx = 0;
    for (const params of inserts) {
        process.stdout.write(`\r${spinner[(spinnerIdx++)%spinner.length]} [${++completed}/${total}] ${params.word}`);
        await insertWord(client, params);
    }

    await client.end();
}

async function main() {
    const inputFiles = process.argv.slice(2);

    if (inputFiles.length > 0) {
        inputFiles.forEach(async (input) => {
            await parseFile(input);
        });
    } else {
        console.log("nothing to do");
    }
}

main();
