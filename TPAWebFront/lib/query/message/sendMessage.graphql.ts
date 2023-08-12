import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
    mutation sendMessage($convID: ID!, $message: String, $image: String, $post: ID) {
        sendMessage(conversationID: $convID, message: $message, image: $image, postID: $post) {
            id
            message
            image
        }
    }
`;
