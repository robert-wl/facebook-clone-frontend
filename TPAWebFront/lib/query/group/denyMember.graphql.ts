import { gql } from "@apollo/client";

export const DENY_MEMBER = gql`
    mutation denyMember($groupId: ID!, $userId: ID!) {
        denyMember(groupId: $groupId, userId: $userId) {
            approved
        }
    }
`;
