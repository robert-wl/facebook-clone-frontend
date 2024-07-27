import { gql } from "@apollo/client";

export const APPROVE_MEMBER = gql`
  mutation approveMember($groupId: ID!, $userId: ID!) {
    approveMember(groupId: $groupId, userId: $userId) {
      approved
    }
  }
`;
