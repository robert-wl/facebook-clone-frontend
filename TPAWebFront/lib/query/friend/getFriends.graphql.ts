import { gql } from "@apollo/client";

export const GET_FRIENDS = gql`
    query getFriends {
        getFriends {
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
