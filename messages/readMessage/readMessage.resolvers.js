import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const resolverFn = async (_, { id }, { loggedInUser }) => {
    const message = client.message.findFirst({
        where: {
            id,
            userId: {
                not: loggedInUser.id,
            },
            room: {
                users: {
                    some: {
                        id: loggedInUser.id,
                    }
                }
            }
        },
        select: {
            id: true,
        }
    });
    if (!message) {
        return {
            ok: false,
            error: "Msg not found",
        };
    }
    await client.message.update({
        where: {
            id,
        },
        data: {
            read: true,
        }
    });
    return {
        ok: true,
    };
};

export default {
    Mutation: {
        readMessage: protectedResolver(resolverFn),
    }
};