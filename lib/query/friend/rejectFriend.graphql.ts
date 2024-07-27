import { gql } from "@apollo/client";

export const REJECT_FRIEND = gql`
    mutation rejectFriend($friend: ID!) {
        rejectFriend(friend: $friend) {
            accepted
        }
    }
`;
