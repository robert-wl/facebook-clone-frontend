import { gql } from "@apollo/client";

export const CREATE_REEL_COMMENT = gql`
  mutation createReelComment($comment: NewReelComment!) {
    createReelComment(comment: $comment) {
      id
      user {
        id
        firstName
        lastName
        username
        profile
      }
      content
      likeCount
      replyCount
    }
  }
`;
