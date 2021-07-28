import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const resolverFn = async (_, { photoId, payload }, { loggedInUser }) => {
    const photo = await client.photo.findUnique({
        where: {
            id: photoId
        },
        select: {
            id: true,
        }
    });
    if (!photo) {
        return {
            ok: false,
            error: "Photo not found"
        };
    }
    await client.comment.create({
        data: {
            photo: {
                connect: {
                    id: photoId,
                }
            },
            user: {
                connect: {
                    id: loggedInUser.id,
                }
            },
            payload,
        }
    });
    return {
        ok: true,
    };
};

export default {
    Mutation: {
        createComment: protectedResolver(resolverFn),
    }
};