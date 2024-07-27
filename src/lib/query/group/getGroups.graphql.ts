import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
  query getGroups {
    getGroups {
      id
      name
      about
      privacy
      background
      members {
        user {
          firstName
          lastName
          username
        }
        approved
        role
      }
      memberCount
      joined
      chat {
        id
      }
    }
  }
`;
