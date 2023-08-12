import { gql } from "@apollo/client";

export const UPDATE_USER_BACKGROUND = gql`
    mutation updateUserBackground($background: String!) {
        updateUserBackground(background: $background) {
            id
        }
    }
`;
