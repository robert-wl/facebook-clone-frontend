import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($post: NewPost!) {
    createPost(newPost: $post) {
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
          createdAt
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
