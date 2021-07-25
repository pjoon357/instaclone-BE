require('dotenv').config();
import express from "express";
import logger from "morgan";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.token),
            };
        },
    });
    await server.start();
    const app = express();
    app.use(graphqlUploadExpress());
    app.use(logger("tiny"));
    app.use("/static", express.static("uploads"));
    server.applyMiddleware({ app });

    const PORT = process.env.PORT;

    app.listen({ port: PORT }, () => {
        console.log(`🎉Server is running on http://localhost:${PORT}/graphql`);
    });
}

startServer();