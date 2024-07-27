import { gql } from "@apollo/client";

export const BLOCK_USER = gql`
  mutation blockUser($username: String!) {
    blockUser(username: $username) {
      receiver {
        firstName
        lastName
      }
    }
  }
`;
