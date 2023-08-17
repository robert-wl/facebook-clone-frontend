import { gql } from "@apollo/client";

export const GET_FILTERED_GROUPS = gql`
    query getFilteredGroups($filter: String!, $pagination: Pagination!) {
        getFilteredGroups(filter: $filter, pagination: $pagination) {
            id
            name
            about
            background
            joined
            privacy
            memberCount
        }
    }
`;
