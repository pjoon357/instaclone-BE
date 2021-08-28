import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
    Subscription: {
        roomUpdate: {
            subscribe: async (root, args, context, info) => {
                const room = await client.room.findFirst({
                    where: {
                        id: args.id,
                        users: {
                            some: {
                                id: context.loggedInUser.id,
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                });
                if (!room) {
                    throw new Error("You can't see this room");
                }
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    ({ roomUpdate }, { id }) => {
                        return roomUpdate.roomId === id;
                    }
                )(root, args, context, info);
            }
        }
    }
};