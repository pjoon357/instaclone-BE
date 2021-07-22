import { ApolloServer, gql } from "apollo-server";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const typeDefs = gql`
    type Query{
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "babe",
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
})

server.listen().then(() => console.log("Server is running on http://localhost:4000/"));