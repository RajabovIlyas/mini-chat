import { Document, MongoClient } from 'mongodb'
import { DatabaseConnection, DatabaseConnectionWithCollection } from './db.interface'

export function connectDatabase(config: DatabaseConnectionWithCollection): DatabaseConnection {
  return {
    async getCollection<T extends Document>() {
      const client = new MongoClient(process.env.MONGO_URL ?? config.url)
      await client.connect()
      const db = client.db(config.db)
      return {
        collection: db.collection<T>(config.collection),
        async disconnect() {
          await client.close()
        }
      }
    }
  }
}