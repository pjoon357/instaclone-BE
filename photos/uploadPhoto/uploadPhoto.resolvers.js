import { protectedResolver } from "../../users/users.utils";
import { GraphQLUpload } from "graphql-upload";
import client from "../../client";
import { processHashtags } from "../photos.utils";

const resolverFn = async (_, { file, caption }, { loggendInUser }) => {
    let hashtagObjs = [];
    if (caption) {
        hashtagObjs = processHashtags(caption);
    }
    return client.photo.create({
        data: {
            file,
            caption,
            user: {
                connect: {
                    id: loggendInUser.id
                }
            },
            ...(hashtagObjs.length > 0 && {
                hashtags: {
                    connectOrCreate: hashtagObjs
                }
            }),
        }
    });
};

export default {
    Upload: GraphQLUpload,
    Mutation: {
        uploadPhoto: protectedResolver(resolverFn)
    }
};