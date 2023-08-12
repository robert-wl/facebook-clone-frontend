import { gql } from "@apollo/client";

export const VIEW_CONVERSATION = gql`
    subscription viewConversation($conversation: ID!) {
        viewConversation(conversationID: $conversation) {
            sender {
                firstName
                lastName
                username
            }
            message
            image
            post {
                id
                user {
                    firstName
                    lastName
                    username
                    profile
                }
                content
                files
            }
            createdAt
        }
    }
`;
