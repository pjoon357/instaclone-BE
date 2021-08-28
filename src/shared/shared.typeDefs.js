import { gql } from "apollo-server-core";

export default gql`
    type MutationResponse{
        ok: Boolean!
        id: Int
        error: String
    }
`;