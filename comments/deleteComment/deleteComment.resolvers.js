import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

const resolverFn = async (_, { id }, { loggedInUser }) => {
    const comment = await client.comment.findUnique({ where: { id } });
    if (!comment) {
        return {
            ok: false,
            error: "Photo not found."
        };
    } else if (comment.userId !== loggedInUser.id) {
        return {
            ok: false,
            error: "Not Authorized"
        };
    } else {
        await client.comment.delete({ where: { id } });
        return {
            ok: true,
        }
    }
}

export default {
    Mutation: {
        deleteComment: protectedResolver(resolverFn)
    }
}