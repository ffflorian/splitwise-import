import * as fs from 'fs';
import * as path from 'path';
const Splitwise = require('splitwise');
import {Parser as CSVParser} from 'csv-parse';
import {Document, ImportOptions, ImporterOptions, UserMap} from './interfaces';

const defaultOptions: Partial<ImporterOptions> = {
  logLevel: 'info',
};

export class SplitwiseImporter {
  private readonly splitwise: typeof Splitwise;

  constructor(options: ImporterOptions) {
    options = {
      ...defaultOptions,
      ...options,
    };
    this.splitwise = Splitwise(options);
  }

  private async checkUsers(userMap: UserMap) {
    const {id: selfId} = await this.getSelf();

    for (const friendId of Object.values(userMap)) {
      if (friendId === selfId) {
        continue;
      }

      try {
        await this.splitwise.getFriend({friend_id: friendId});
      } catch (error) {
        console.error(error);
        throw new Error(`You are not friends with user "${friendId}".`);
      }
    }
  }

  private getSelf(): any {
    return this.splitwise.getCurrentUser();
  }

  mapUser(document: Document, map: UserMap): Document {
    return {
      ...document,
      by: map[document.by],
    };
  }

  async importCSV(csv: string, options: ImportOptions): Promise<void> {
    await this.checkUsers(options.userMap);
    const parser = new CSVParser({});
    parser.read();
  }

  async importCSVFile(csvFile: string, options: ImportOptions): Promise<void> {
    await this.checkUsers(options.userMap);
    const resolvedPath = path.resolve(csvFile);
    const parser = new CSVParser({});
    fs.createReadStream(resolvedPath)
      .pipe(parser)
      .on('data', console.log)
      .on('error', console.error);
  }
}
