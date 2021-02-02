import "reflect-metadata";
// import { Connection, createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as cors from "cors";
import executableSchema from "./schema/";

const PORT = 4000;
const startServer = async () => {
  //   const connection: Connection = await createConnection();
  const server = new ApolloServer({ schema: executableSchema });
  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log("App is running on port" + " " + PORT);
  });
};

startServer().catch((error) => console.log("error", error));
