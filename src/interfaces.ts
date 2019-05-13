export interface ImporterOptions {
  /** Re-use an existing access token */
  accessToken?: string;
  /** Obtained by registering your application */
  consumerKey: string;
  /** Obtained by registering your application */
  consumerSecret: string;
  expense_id?: string;
  friend_id?: string;
  group_id?: string;
  logLevel?: 'error' | 'info';
  /** Will be called with info and error messages */
  logger?: (...args: any[]) => void;
  /** Set to 'error' to only see error messages */
  user_id?: string;
}

export type UserMap = Record<string, string>;

export interface ImportOptions {
  /**
   * Map the users in the CSV to a user ID in splitwise
   * in the format `{name: 123456}`.
   */
  userMap: UserMap;
}

export interface Document {
  amount: string;
  by: string;
  createdOn: string;
  currency: string;
  date: string;
  title: string;
}
