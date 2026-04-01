const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    console.log('Connecting to:', uri.replace(/:[^:]*@/, ':****@'));
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('faboradb');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
  }
}
run();
