import { gql } from "@apollo/client";

export const LEAVE_GROUP = gql`
    mutation leaveGroup($group: ID!) {
        leaveGroup(groupId: $group)
    }
`;
