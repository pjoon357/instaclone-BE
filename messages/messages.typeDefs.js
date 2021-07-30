import { gql } from "apollo-server-express";

export default gql`
    type Message{
        id: Int!
        user: User!
        room: Room!
        payload: String!
        createdAt: String!
        updatedAt: String!
    }
    type Room{
        id: Int!
        users: [User]
        messages: [Message]
        createdAt: String!
        updatedAt: String!
    }
`;