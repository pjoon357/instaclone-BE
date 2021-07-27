import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeFeed: protectedResolver((_, { lastId }, { loggedInUser }) =>
            client.photo.findMany({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id,
                                    },
                                },
                            },
                        },
                        {
                            userId: loggedInUser.id,
                        },
                    ],
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
        ),
    },
};