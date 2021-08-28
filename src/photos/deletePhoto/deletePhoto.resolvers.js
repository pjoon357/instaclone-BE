import client from "../../client"
import { deleteToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils"
import { PrismaDelete } from "@paljs/plugins";

const resolverFn = async (_, { id }, { loggedInUser }) => {
    const photo = await client.photo.findUnique({ where: { id }, select: { userId: true, file: true } });
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
        await deleteToS3(photo.file, "uploads");
        const prismaDelete = new PrismaDelete(client)
        await prismaDelete.onDelete({
            model: "Photo",
            where: {
                id,
            },
            deleteParent: true,
        });
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