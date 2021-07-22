const { ApolloServer, gql } = require("apollo-server");

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