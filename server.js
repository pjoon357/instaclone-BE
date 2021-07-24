require('dotenv').config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const server = new ApolloServer({
    schema,
    cnotext: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        };
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`🎉Server is running on http://localhost:${PORT}`));