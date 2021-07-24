import bycrypt from "bcrypt";
import client from "../client";

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            { username },
                            { email },
                        ]
                    }
                });
                if (existingUser) {
                    throw new Error("This username/email is already taken.");
                }
                const uglyPassword = await bycrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        username,
                        firstName,
                        lastName,
                        email,
                        password: uglyPassword,
                    }
                });
            } catch (err) {
                return err;
            }

        }
    }
}