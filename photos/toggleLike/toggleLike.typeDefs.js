import { gql } from "apollo-server-express";

export default gql`
    type toggleLikeResult{
        ok: Boolean!
        error: String
    }
    type Query{
        toggleLike(id: Int!): toggleLikeResult!
    }
`;