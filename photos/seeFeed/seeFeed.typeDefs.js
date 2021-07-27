import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFeed(lastId:Int): [Photo]
  }
`;