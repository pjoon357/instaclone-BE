import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const resolverFn = (_, { offset }, { loggedInUser }) =>
    client.photo.findMany({
        take: 2,
        skip: offset,
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
    });

export default {
    Query: {
        seeFeed: protectedResolver(resolverFn),
    },
};