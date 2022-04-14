import fs from 'fs';
import { program } from 'commander';
import { pipeline } from 'stream';
import { transformer } from './transformer.js';
import { checkIfSynonyms } from './checkIfSynonyms.js';

program
  .option('--inputFile <file>', 'input file')
  .option('--outputFile <file>', 'output file')
  .parse(process.argv);

const { inputFile, outputFile } = program.opts();
const inputStream = inputFile ? fs.createReadStream(inputFile) : process.stdin;
const transformStream = transformer(checkIfSynonyms);
const outputStream = outputFile ? fs.createWriteStream(outputFile) : process.stdout;

pipeline(inputStream, transformStream, outputStream, (err) => {
  if (err) {
    process.stderr.write(`pipeline error: ${err}\n`);
    process.exit(1);
  }
});


