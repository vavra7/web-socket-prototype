// Model

export interface EditingUser {
  quoteId: string;
  signum: string;
  socketId: string;
}

// WS Payload

export interface StartEdit {
  quoteId: string;
  signum: string;
}

export interface EditStatus {
  lastVersion: number | null;
  quoteId: string;
  users: string[];
}
