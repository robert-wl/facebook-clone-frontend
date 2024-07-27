import { gql } from "@apollo/client";

export const GET_USER_FRIENDS = gql`
  query getUserFriends($username: String!) {
    getUserFriends(username: $username) {
      id
      firstName
      lastName
      username
      email
      dob
      gender
      active
      profile
    }
  }
`;
