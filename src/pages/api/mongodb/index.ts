import { Cluster } from "@solana/web3.js";
import { MongoClient, ServerApiVersion } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGO_DB_URI || "", {
  serverApi: ServerApiVersion.v1,
});

export const getMongoDatabase = (cluster: Cluster = "mainnet-beta") => {
  const name = cluster === "mainnet-beta" ? "app-db" : "app-db-test";

  return mongoClient.db(name);
};
