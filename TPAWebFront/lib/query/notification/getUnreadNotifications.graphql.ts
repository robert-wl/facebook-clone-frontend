import { gql } from "@apollo/client";

export const GET_UNREAD_NOTIFICATIONS = gql`
    mutation getUnreadNotifications {
        getUnreadNotifications {
            id
            message
            sender {
                firstName
                lastName
                profile
            }
            createdAt
            postId
            reelId
            storyId
        }
    }
`;
