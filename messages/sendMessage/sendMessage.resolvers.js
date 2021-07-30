import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants";

const resolverFn = async (_, { payload, roomId, userId }, { loggedInUser }) => {
    let room = null;
    if (userId) {
        const user = await client.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
            },
        });
        if (!user) {
            return {
                ok: false,
                error: "This user does not exist.",
            };
        }
        room = await client.room.create({
            data: {
                users: {
                    connect: [
                        {
                            id: userId,
                        },
                        {
                            id: loggedInUser.id,
                        },
                    ],
                },
            },
        });
    } else if (roomId) {
        room = await client.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                id: true,
            },
        });
        if (!room) {
            return {
                ok: false,
                error: "Room not found.",
            };
        }
    }
    const message = await client.message.create({
        data: {
            payload,
            room: {
                connect: {
                    id: room.id,
                },
            },
            user: {
                connect: {
                    id: loggedInUser.id,
                },
            },
        },
    });

    pubsub.publish(NEW_MESSAGE, { roomUpdate: { ...message } });

    return {
        ok: true,
    };
};

export default {
    Mutation: {
        sendMessage: protectedResolver(resolverFn)
    }
};