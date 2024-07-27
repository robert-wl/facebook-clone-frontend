import { gql } from "@apollo/client";

export const UPDATE_THEME = gql`
    mutation updateTheme($theme: String!) {
        updateTheme(theme: $theme) {
            theme
        }
    }
`;
