#!/usr/bin/env node

import {SplitwiseImporter} from './Importer';

const importer = new SplitwiseImporter({
  consumerKey: '',
  consumerSecret: '',
});

importer
  .importCSVFile('', {
    userMap: {},
  })
  .then(console.log)
  .catch(console.error);
