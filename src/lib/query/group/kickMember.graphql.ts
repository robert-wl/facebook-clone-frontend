import { gql } from "@apollo/client";

export const KICK_MEMBER = gql`
  mutation kickMember($groupId: ID!, $userId: ID!) {
    kickMember(groupId: $groupId, userId: $userId)
  }
`;
