import { gql } from "apollo-server";

export default gql`
    type User{
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar:  String
        followers: [User]
        following: [User]
        createdAt: String!
        updatedAt: String!
        totalFollowing: Int!
        totalFollowers: Int!
    }
`;
        //isFollowing: Boolean!
       // isMe: Boolean!