import { gql } from "apollo-server";

export default gql`
    type updateProfileResult{
        ok: Boolean!
        error:String
    }
    type Mutation{
        updateProfile(
            firstName: String
            lastName: String
            username: String
            email: String
            password: String
        ): updateProfileResult!
    }
`;