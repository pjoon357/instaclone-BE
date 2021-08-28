require('dotenv').config();
import express from "express";
import logger from "morgan";
import http from "http";
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import console from "console";

async function startServer() {
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
        schema,
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
    server.applyMiddleware({ app });

    const httpServer = http.createServer(app);

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        async onConnect({ token }) {
            if (!token) {
                throw new Error('Missing auth token!');
            }
            return {
                loggedInUser: await getUser(token),
            };
        }
    }, {
        server: httpServer,
        path: server.graphqlPath,
    });
    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => subscriptionServer.close());
    });

    const PORT = process.env.PORT;

    httpServer.listen(PORT, () => {
        console.log(`🎉Server is running on http://localhost:${PORT}/graphql`);
    });
}

startServer();