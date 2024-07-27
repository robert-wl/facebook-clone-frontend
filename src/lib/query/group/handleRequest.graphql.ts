import { gql } from "@apollo/client";

export const HANDLE_REQUEST = gql`
  mutation handleRequest($id: ID!) {
    handleRequest(groupId: $id) {
      approved
      role
    }
  }
`;
