import { gql } from "apollo-server-express";

export default gql`
    type Message{
        id: Int!
        user: User!
        room: Room!
        payload: String!
        read: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    type Room{
        id: Int!
        unreadTotal: Int!
        users: [User]
        messages: [Message]
        createdAt: String!
        updatedAt: String!
    }
`;