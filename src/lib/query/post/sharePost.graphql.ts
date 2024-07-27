import { gql } from "@apollo/client";

export const SHARE_POST = gql`
  mutation sharePost($user: ID!, $post: ID!) {
    sharePost(userID: $user, postID: $post)
  }
`;
