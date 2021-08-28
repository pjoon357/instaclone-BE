import { gql } from "apollo-server-express";

export default gql`
    type Query{
        seeComment(photoId: Int!, lastId: Int): [Comment]
    }
`;