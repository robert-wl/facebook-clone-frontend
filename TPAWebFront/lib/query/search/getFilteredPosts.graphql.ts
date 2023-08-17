import { gql } from "@apollo/client";

export const GET_FILTERED_POSTS = gql`
    query getFilteredPosts($filter: String!, $pagination: Pagination!) {
        getFilteredPosts(filter: $filter, pagination: $pagination) {
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
