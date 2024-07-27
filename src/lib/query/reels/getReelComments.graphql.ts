import { gql } from "@apollo/client";

export const GET_REEL_COMMENTS = gql`
    query getReelComments($id: ID!) {
        getReelComments(reelId: $id) {
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
            liked
            comments {
                id
                user {
                    firstName
                    lastName
                    username
                    profile
                }
                content
                likeCount
                replyCount
                liked
            }
        }
    }
`;
