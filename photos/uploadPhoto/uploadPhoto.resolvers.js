import { protectedResolver } from "../../users/users.utils";
import { GraphQLUpload } from "graphql-upload";
import client from "../../client";

const resolverFn = async (_, { file, caption }, { loggendInUser }) => {
    let hashtagObjs = [];
    if (caption) {
        const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
        hashtagObjs = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag }
        })
        );
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