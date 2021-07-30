import { gql } from "apollo-server-express";

export default gql`
    type Subscription{
        roomUpdate(id: Int!): Message
    }
`;