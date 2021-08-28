import client from "../../client";

export default {
    Query: {
        seeLikes: (_, { id, lastId }) => client.user.findMany({
            where: {
                likes: {
                    some: {
                        photoId: id,
                    }
                }
            },
            take: 20,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
        })
    }
};