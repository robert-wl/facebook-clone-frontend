import { gql } from "@apollo/client";

export const GET_GROUP = gql`
    query getGroup($id: ID!) {
        getGroup(id: $id) {
            id
            name
            about
            privacy
            background
            isAdmin
            posts {
                id
                user {
                    firstName
                    lastName
                    username
                    profile
                    email
                    gender
                    dob
                }
                content
                privacy
                likeCount
                commentCount
                shareCount
                liked
                comments {
                    id
                    content
                }
                files
                createdAt
            }
            members {
                user {
                    firstName
                    lastName
                    username
                }
                approved
                role
            }
            memberCount
            chat {
                id
            }
        }
    }
`;
