import { gql } from "apollo-server-express";

export default gql`
    type Photo{
        id: Int!
        user: User!
        file: String!
        caption: String
        likes: Int!
        comments: Int!
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
        isLiked: Boolean!
        isMine: Boolean
    }

    type Hashtag {
        id: Int!
        hashtag: String
        photos(lastId: Int): [Photo]
        createdAt: String!
        updatedAt: String!
        totalPhotos: Int
    }

    type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;