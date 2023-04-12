import { MongoClient } from 'mongodb'

let client

export const initializeDbConnection = async () => {
  try {
    const mongo_db_url = process.env.MONGODB_URI
    client = await MongoClient.connect(mongo_db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database Connection Successfully Created...')
  } catch (error) {
    console.log(error.message) 
  }
}

export const getDbConnection = dbName => {
  const db = client.db(dbName)
  return db
}
