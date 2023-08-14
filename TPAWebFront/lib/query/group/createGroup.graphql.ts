import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
    mutation createGroup($group: NewGroup!) {
        createGroup(group: $group) {
            id
            name
            about
            privacy
            background
            members {
                user {
                    firstName
                    lastName
                    username
                }
                approved
                role
            }
            chat {
                id
            }
        }
    }
`;
