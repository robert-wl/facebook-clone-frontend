import { gql } from "@apollo/client";

export const GET_GROUP_POSTS = gql`
    query getGroupPosts($group: ID!, $pagination: Pagination!) {
        getGroupPosts(groupId: $group, pagination: $pagination) {
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
    }
`;
