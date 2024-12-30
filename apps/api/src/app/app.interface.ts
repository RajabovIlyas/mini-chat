import { Config } from '../utils/config/config.interface'
import { DatabaseConnection, DatabaseConnectionWithCollection } from '../utils/db/db.interface'
import { Logger } from 'winston'

export interface AppConfig {
  connectDatabase(config: DatabaseConnectionWithCollection): DatabaseConnection

  config: Config,
  logger: Logger
}