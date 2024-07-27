import { gql } from "@apollo/client";

export const GET_FRIEND_REQUESTS = gql`
  query getFriendRequests {
    getFriendRequests {
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
