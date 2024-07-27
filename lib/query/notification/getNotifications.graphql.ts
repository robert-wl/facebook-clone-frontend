import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
    query getNotifications {
        getNotifications {
            id
            message
            sender {
                firstName
                lastName
                profile
                username
            }
            createdAt
            postId
            reelId
            groupId
            storyId
        }
    }
`;
