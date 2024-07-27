import { gql } from "@apollo/client";

export const UPDATE_GROUP_BACKGROUND = gql`
  mutation updateGroupBackground($id: ID!, $background: String!) {
    updateGroupBackground(groupId: $id, background: $background) {
      background
    }
  }
`;
