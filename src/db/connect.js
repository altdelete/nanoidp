// /src/db/connect.js
import { MongoClient } from 'mongodb';

let client;

export const connectToDB = async () => {
	if (!client) {
		client = new MongoClient(process.env.MONGODB_URI,);
		await client.connect();
	}

	const db = client.db('idp'); // idp is the database name
	return { db, client };
};
