import { DatabaseConfig } from '../db/db.interface'

export interface AppConfig {
  port: number;
  host: string;
}


export interface Config {
  app: AppConfig;
  database: DatabaseConfig
}