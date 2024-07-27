import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation resetPassword($id: String!, $password: String!) {
    resetPassword(id: $id, password: $password) {
      id
    }
  }
`;
