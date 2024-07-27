import { gql } from "@apollo/client";

export const CREATE_REEL = gql`
    mutation createReel($reel: NewReel!) {
        createReel(reel: $reel) {
            id
            user {
                firstName
                lastName
                username
            }
            content
            video
            likeCount
        }
    }
`;
