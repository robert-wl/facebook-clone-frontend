import { gql } from "@apollo/client";

export const CREATE_CONVERSATION = gql`
    mutation createConversation($username: String!) {
        createConversation(username: $username) {
            id
        }
    }
`;
