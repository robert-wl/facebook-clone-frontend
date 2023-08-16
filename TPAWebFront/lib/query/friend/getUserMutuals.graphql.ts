import { gql } from "@apollo/client";

export const GET_USER_MUTUALS = gql`
    query getUserMutuals($username: String!) {
        getUserMutuals(username: $username) {
            id
            firstName
            lastName
            username
            email
            dob
            gender
            active
        }
    }
`;
