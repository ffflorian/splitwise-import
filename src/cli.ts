#!/usr/bin/env node

import * as program from 'commander';
import {SplitwiseImporter} from './Importer';

const {name, version, description}: {name: string; version: string; description: string} = require('../package.json');

program
  .name(name.replace(/.*\//, ''))
  .description(description)
  .option('-i, --input <file>', 'Set CSV file (required)')
  .option('-k, --api-key <key>', 'Set the API key (required)')
  .option('-s, --api-secret <secret>', 'Set the API secret (required)')
  .version(version, '-v, --version')
  .parse(process.argv);

if (!program.input || !program.apiKey || !program.apiSecret) {
  program.outputHelp();
  process.exit(1);
}

const importer = new SplitwiseImporter({
  consumerKey: program.apiKey,
  consumerSecret: program.apiSecret,
});

importer
  .importCSVFile(program.input, {
    userMap: {},
  })
  .then(console.log)
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
