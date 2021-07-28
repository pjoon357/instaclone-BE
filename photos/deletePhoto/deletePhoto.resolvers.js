import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

const resolverFn = async (_, { id }, { loggedInUser }) => {
    const photo = await client.photo.findUnique({ where: { id } });
    if (!photo) {
        return {
            ok: false,
            error: "Photo not found."
        };
    } else if (photo.userId !== loggedInUser.id) {
        return {
            ok: false,
            error: "Not Authorized"
        };
    } else {
        await client.photo.delete({ where: { id } });
        return {
            ok: true,
        }
    }
}

export default {
    Mutation: {
        deletePhoto: protectedResolver(resolverFn)
    }
}