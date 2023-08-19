import { gql } from "@apollo/client";

export const GET_AUTH = gql`
    query {
        getAuth {
            id
            firstName
            lastName
            username
            profile
            dob
            gender
            email
            notificationCount
            theme
        }
    }
`;
