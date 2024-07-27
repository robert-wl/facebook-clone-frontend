import { gql } from "@apollo/client";

export const LIKE_REEL = gql`
  mutation likeReel($reel: ID!) {
    likeReel(reelId: $reel) {
      reelId
    }
  }
`;
