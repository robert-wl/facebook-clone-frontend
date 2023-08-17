import { gql } from "@apollo/client";

export const GET_GROUP_HOME_POSTS = gql`
    query getGroupHomePosts($pagination: Pagination!) {
        getGroupHomePosts(pagination: $pagination) {
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
            postTags {
                user {
                    firstName
                    lastName
                }
            }
            comments {
                id
                content
            }
            files
            createdAt
        }
    }
`;
