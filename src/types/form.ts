export interface IForm {
  slug: string;
  title: string;
  heroImage?: string;
  pages: {
    name: string;
    elements: object[];
    readTimeEnforcement?: number;
    customData?: { sheetName?: string; [key: string]: unknown };
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
    [key: string]: unknown;
  };
  fileStorage?: {
    provider: string;
    config: Record<string, unknown>;
  };
}
