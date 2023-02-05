import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config()


// database configuration
const config = {
    uri: process.env.ATLAS_URI,
    dbName: "ems"
}


const client = new MongoClient(config.uri);
let database;

const getDatabase = async () => {

    try {
        await client.connect();
        console.log("Connected to MongoDB server");

        database = client.db(config.dbName);
        return database;
    }
    catch (error) {
        console.error(error)
    }


}

export default getDatabase;