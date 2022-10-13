#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { USFMParser } from 'usfm-grammar';

import { getInsertQuery, getInsertQueryParams } from './db';

async function parseFile(path: string) {
    const defaultCollection = {
        language_index: "_fake_index_1",
        language_id: 1,
        collection_name: "us_ENG"
    }

    const content = await readFile(path, 'utf8');
    const parser = new USFMParser(content);
    const json = parser.toJSON();

    const queryParams = getInsertQueryParams(defaultCollection, json);
    const query = getInsertQuery(queryParams);

    return query;
}

async function main() {
    const inputFiles = process.argv.slice(2);

    if (inputFiles.length > 0) {
        inputFiles.forEach(async (input) => {
            console.log(await parseFile(input));
        });
    } else {
        console.log("nothing to do");
    }
}

main();
