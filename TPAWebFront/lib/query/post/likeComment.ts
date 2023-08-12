import { gql } from "@apollo/client";

export const LIKE_COMMENT = gql`
    mutation likeComment($id: ID!) {
        likecomment(commentID: $id) {
            commentId
        }
    }
`;
