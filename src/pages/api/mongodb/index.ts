import { Cluster } from "@solana/web3.js";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@sai-main.eh3jch5.mongodb.net/?retryWrites=true&w=majority`;

export const mongoClient = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

export const getMongoDatabase = (cluster: Cluster = "mainnet-beta") => {
  const name = cluster === "mainnet-beta" ? "app-db" : "app-db-test";

  return mongoClient.db(name);
};
