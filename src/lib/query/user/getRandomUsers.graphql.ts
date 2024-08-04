import { gql } from "@apollo/client";

export const GET_RANDOM_USERS = gql`
  query getRandomUsers($amount: Int!) {
    getRandomUsers(amount: $amount) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;
