import { gql } from "apollo-server-express";

export default gql`
    scalar Upload
    type Mutation{
        updateProfile(
            firstName: String
            lastName: String
            username: String
            email: String
            password: String
            bio: String
            avatar: Upload
        ): MutationResponse!
    }
`;