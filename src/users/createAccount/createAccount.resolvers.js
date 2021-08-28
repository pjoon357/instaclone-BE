import bcrypt from "bcrypt";
import client from "../../client";

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
                const uglyPassword = await bcrypt.hash(password, 10);
                await client.user.create({
                    data: {
                        username,
                        firstName,
                        lastName,
                        email,
                        password: uglyPassword,
                    }
                });

                return {
                    ok: true
                };
            } catch (err) {
                return {
                    ok: false,
                    error: "Can't create account"
                };
            }

        },
    }
};