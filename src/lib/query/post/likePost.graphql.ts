import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation likePost($id: ID!) {
    likePost(postID: $id) {
      postId
    }
  }
`;
