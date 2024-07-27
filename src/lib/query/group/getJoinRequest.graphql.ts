import { gql } from "@apollo/client";

export const GET_JOIN_REQUESTS = gql`
  query getJoinRequests($id: ID!) {
    getJoinRequests(groupId: $id) {
      user {
        id
        firstName
        lastName
        username
        profile
      }
    }
  }
`;
