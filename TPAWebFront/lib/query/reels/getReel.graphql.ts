import { gql } from "@apollo/client";

export const GET_REEL = gql`
    query getReel($id: ID!) {
        getReel(id: $id) {
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
