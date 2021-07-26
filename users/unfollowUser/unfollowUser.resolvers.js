import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, { username }, { loggedInUser }) => {
    const isUser = client.user.findUnique({ where: { username } });
    if (!isUser) {
        return {
            ok: false,
            error: "That user does not exist",
        };
    }
    await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            following: {
                disconnect: {
                    username,
                }
            }
        }
    });
    return {
        ok: true
    };
};

export default {
    Mutation: {
        unfollowUser: protectedResolver(resolverFn)
    }
};