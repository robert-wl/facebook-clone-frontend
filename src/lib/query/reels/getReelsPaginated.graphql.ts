import { gql } from "@apollo/client";

export const GET_REELS_PAGINATED = gql`
  query getReelsPaginated($pagination: Pagination!) {
    getReelsPaginated(pagination: $pagination) {
      id
      user {
        id
        firstName
        lastName
        username
        profile
      }
      content
      shareCount
      likeCount
      commentCount
      liked
      video
    }
  }
`;
