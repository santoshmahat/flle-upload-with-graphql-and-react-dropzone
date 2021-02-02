import { makeExecutableSchema } from "graphql-tools";
import fileSchema from "./fileTypeDefs";
import fileResolver from "../resolvers/fileResolvers";
import { gql } from "apollo-server-express";

const rootTypeDefs = gql`
  type Query {
    root: String
  }
  type Muation {
    root: String
  }
`;

const executableSchema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, fileSchema],
  resolvers: fileResolver,
});

export default executableSchema;
