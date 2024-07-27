import { gql } from "@apollo/client";

export const PROMOTE_MEMBER = gql`
    mutation promoteMember($groupId: ID!, $userId: ID!) {
        promoteMember(groupId: $groupId, userId: $userId) {
            approved
        }
    }
`;
