import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation createPost($post: NewPost!) {
        createPost(newPost: $post) {
            id
            user {
                firstName
                lastName
                profile
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
