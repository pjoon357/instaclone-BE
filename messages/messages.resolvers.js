import client from "../client";

export default {
    Room: {
        users: ({ id }) => client.user.findMany({
            where: {
                rooms: {
                    some: {
                        id
                    }
                }
            }
        }),
        messages: ({ id }) => client.message.findMany({
            where: {
                roomId: id,
            }
        }),
        unreadTotal: () => 0,
    },
};