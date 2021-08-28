import client from "../../client";

export default {
    Query: {
        seeComment: (_, { photoId, lastId }) => client.comment.findMany({
            where: {
                photo: {
                    id: photoId,
                }
            },
            orderBy: {
                createdAt: "asc"
            },
            take: 10,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
        })
    }
};