import { gql } from "@apollo/client";

export const GET_JOINED_GROUPS = gql`
    query getJoinedGroups {
        getJoinedGroups {
            id
            name
            about
            privacy
            background
        }
    }
`;
