import { gql } from "@apollo/client";

export const ADD_FRIEND = gql`
    mutation addFriend($friendInput: FriendInput!) {
        addFriend(friendInput: $friendInput) {
            sender {
                username
            }
            receiver {
                username
            }
            accepted
        }
    }
`;
