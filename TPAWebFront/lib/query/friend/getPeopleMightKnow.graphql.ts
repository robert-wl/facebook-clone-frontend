import { gql } from "@apollo/client";

export const GET_PEOPLE_MIGHT_KNOW = gql`
    query getPeopleMightKnow {
        getPeopleMightKnow {
            id
            firstName
            lastName
            username
            email
            dob
            gender
            profile
            active
        }
    }
`;
