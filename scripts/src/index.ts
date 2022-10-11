#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { USFMParser } from 'usfm-grammar';

async function parseFile(path: string) {
    const content = await readFile(path, 'utf8');
    const parser = new USFMParser(content);
    return parser.toJSON();
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
