import { gql } from "apollo-server-express";

export default gql`
    type Query{
        seeLikes(id:Int!): [User]
    }
`;