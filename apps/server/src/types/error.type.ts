export interface ErrorExtension {
  [key: string]: any;
  code: string;
}

export interface ErrorResponse {
  [key: string]: any;
  extensions: ErrorExtension;
  message: string;
}
