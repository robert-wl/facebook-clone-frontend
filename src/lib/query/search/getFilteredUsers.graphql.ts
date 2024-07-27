import { gql } from "@apollo/client";

export const GET_FILTERED_USERS = gql`
  query getFilteredUsers($filter: String!, $pagination: Pagination!) {
    getFilteredUsers(filter: $filter, pagination: $pagination) {
      id
      firstName
      lastName
      username
      profile
      friended
    }
  }
`;
