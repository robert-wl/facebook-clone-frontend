import { gql } from "@apollo/client";

export const LIKE_REEL_COMMENT = gql`
    mutation likeReelComment($id: ID!) {
        likeReelComment(reelCommentId: $id) {
            reelCommentId
        }
    }
`;
