import client from "../client";

export default {
    Photo: {
        user: ({ userId }) => {
            return client.user.findUnique({ where: { userId } });
        },
        hashtags: ({ id }) => client.hashtag.findMany({
            where: {
                photos: {
                    some: {
                        id
                    }
                }
            }
        }),
        likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    },
    Hashtag: {
        photos: ({ id }, { lastId }) => {
            return client.hashtag, findUnique({ where: { id } }).photos({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } })
            });
        },
        totalPhotos: ({ id }) => client.photo.count({
            where: {
                hashtags: {
                    some: {
                        id
                    }
                }
            }
        })
    }
};