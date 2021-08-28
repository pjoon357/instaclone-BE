import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const resolverFn = (_, __, { loggedInUser }) => client.room.findMany({
    where: {
        users: {
            some: {
                id: loggedInUser.id
            }
        }
    }
});

export default {
    Query: {
        seeRooms: protectedResolver(resolverFn)
    }
};