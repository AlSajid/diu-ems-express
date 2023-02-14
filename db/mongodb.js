import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config()


// database configuration
const config = {
    uri: process.env.ATLAS_URI,
    dbName: "cse"
}


const client = new MongoClient(config.uri);
const database = client.db(config.dbName);

export default database;