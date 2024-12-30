import { Collection, Document } from 'mongodb'

export interface DatabaseConfig {
  db: string;
  url: string;
}

export interface DatabaseConnectionWithCollection extends DatabaseConfig {
  collection: string;
}

interface DatabaseResponse<T extends Document> {
  collection: Collection<T>;

  disconnect(): Promise<void>;
}

export interface DatabaseConnection {
  getCollection<T extends Document>(): Promise<DatabaseResponse<T>>,
}