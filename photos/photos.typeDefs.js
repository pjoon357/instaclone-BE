import { gql } from "apollo-server-express";

export default gql`
    type Photo{
        id: Int!
        user: User!
        file: String!
        caption: String
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }

    type Hashtag {
        id: Int!
        hashtag: String
        photos(lastId: Int): [Photo]
        createdAt: String!
        updatedAt: String!
        totalPhotos: Int
    }
`;