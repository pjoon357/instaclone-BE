import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { deleteToS3, uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (_,
    { firstName, lastName, username, email, password: newPassword, bio, avatar },
    { loggedInUser }
) => {
    let avatarUrl = loggedInUser.avatar;
    if (avatar) {
        if (avatarUrl) {
            await deleteToS3(avatarUrl, "avatars");
        }
        avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
        /*const { filename, createReadStream } = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`;*/
    }

    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(avatar && { avatar: avatarUrl }),
            ...(uglyPassword && { password: uglyPassword }),
        },
    });
    if (updatedUser.id) {
        return {
            ok: true,
        };
    } else {
        return {
            ok: false,
            error: "Could not update profile.",
        };
    }
};

export default {
    Upload: GraphQLUpload,
    Mutation: {
        updateProfile: protectedResolver(resolverFn),
    }
};