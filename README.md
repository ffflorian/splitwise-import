# splitwise-import [![Build Status](https://action-badges.now.sh/ffflorian/splitwise-import)](https://github.com/ffflorian/splitwise-import/actions/) [![npm version](https://img.shields.io/npm/v/splitwise-import.svg?style=flat)](https://www.npmjs.com/package/splitwise-import) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/splitwise-import)](https://dependabot.com)

Import CSV to [splitwise](https://www.splitwise.com/).

## Installation

Run `yarn add splitwise-import` or `npm install splitwise-import`.

## Usage

To use `splitwise-import`, you need:

- an active splitwise account
- an API key and an API secret (to be found on your [Apps page](https://secure.splitwise.com/apps))
- a CSV file in the [required format](#required-csv-format)

If you have both, run `splitwise-import --help` to display the usage information:

```
Usage: splitwise-import [options]

Import CSV to splitwise

Options:
  -i, --input <file>         Set CSV file (required)
  -k, --api-key <key>        Set the API key (required)
  -s, --api-secret <secret>  Set the API secret (required)
  -v, --version              output the version number
  -h, --help                 output usage information
```

### Example

```
splitwise-import -i my-entries.csv -k 6914d9c056e552a4ae8b5117fee3bc8188299ad2 -s f6653eb3d5ce1df179c614f1d633acf5cb56e85a
```

## Required CSV format

The CSV needs to have the following fields (the order of the columns is not important):

| Title       | Amount | By      | Created |
| ----------- | ------ | ------- | ------- |
| Groceries   | €21.98 | Florian | 20/3/19 |
| Electronics | €10.20 | Lena    | 20/3/19 |

Example:

```
Title;Amount;By;Created on
Groceries;€21.98;Florian;2/3/19
Electronics;€10.20;Lena;2/3/19
```

If any of the fields is missing, `splitwise-import` will stop the import.
