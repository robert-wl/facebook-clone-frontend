import { gql } from "@apollo/client";

export const GET_USER_WITH_STORIES = gql`
    query GetUserWithStories {
        getUserWithStories {
            id
            firstName
            lastName
            username
            profile
        }
    }
`;
