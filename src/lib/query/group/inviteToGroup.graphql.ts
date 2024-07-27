import { gql } from "@apollo/client";

export const INVITE_TO_GROUP = gql`
  mutation inviteToGroup($groupId: ID!, $userId: ID!) {
    inviteToGroup(groupId: $groupId, userId: $userId) {
      approved
      role
    }
  }
`;
