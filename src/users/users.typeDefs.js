import { gql } from "apollo-server-express";

export default gql`
    type User{
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar:  String
        photos: [Photo]
        followers: [User]
        following: [User]
        createdAt: String!
        updatedAt: String!
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
    }
`;