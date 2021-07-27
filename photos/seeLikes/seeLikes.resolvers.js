import client from "../../client";

export default {
    Query: {
        seeLikes: (_, { id }) => client.user.findMany({
            where: {
                likes:{
                    some:{
                        photoId: id,
                    }
                }
            }
        })
    }
};