import { gql } from "@apollo/client";

export const ACCEPT_FRIEND = gql`
  mutation acceptFriend($friend: ID!) {
    acceptFriend(friend: $friend) {
      accepted
    }
  }
`;
