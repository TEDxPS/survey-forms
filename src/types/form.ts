export interface IForm {
  slug: string;
  title: string;
  heroImage?: string;
  pages: {
    name: string;
    elements: object[];
    readTimeEnforcement?: number;
    customData?: { [key: string]: unknown };
  }[];
  expiry?: {
    date: string;
    message?: string;
  };
  allowDuplicateEmails?: boolean;
  google?: {
    sheetId?: string;
    client_email: string;
    private_key: string;
    /** Opt-in: copies each submission into an additional sheet tab based on one answer's value. */
    sheetRouting?: {
      field: string;
      map: Record<string, string>;
    };
    [key: string]: unknown;
  };
  fileStorage?: {
    provider: string;
    config: Record<string, unknown>;
  };
}
