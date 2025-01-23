import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
	throw new Error("MONGODB_CONNECTION_STRING is not defined");
}

let client: MongoClient;

export const mongoclient = async () => {
	if (!client) {
		client = new MongoClient(connectionString);
		await client.connect();
	}

	return client;
};
