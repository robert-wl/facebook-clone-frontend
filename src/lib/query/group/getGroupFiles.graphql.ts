import { gql } from "@apollo/client";

export const GET_GROUP_FILES = gql`
  query getGroupFiles($id: ID!) {
    getGroupFiles(groupId: $id) {
      id
      name
      type
      url
      uploadedBy {
        firstName
        lastName
        username
      }
      uploadedAt
    }
  }
`;
