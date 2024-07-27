import { gql } from "@apollo/client";

export const GET_GROUP_INVITE = gql`
  query getGroupInvite($id: ID!) {
    getGroupInvite(id: $id) {
      id
      firstName
      lastName
      username
      profile
    }
  }
`;
