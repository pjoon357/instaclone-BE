import client from "../../client"

export default {
    Query: {
        seeFollowing: async (_, { username, lastId }) => {
            const isUser = await client.user.findUnique({ where: { username }, select: { id: true } });
            if (!isUser) {
                return {
                    ok: false,
                    error: "User is not found"
                };
            }
            const following = await client.user.findUnique({ where: { username } }).following({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } })
            });
            return {
                ok: true,
                following,
            };
        }
    }
};