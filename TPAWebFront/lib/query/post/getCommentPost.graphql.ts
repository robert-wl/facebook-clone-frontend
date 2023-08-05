import {gql} from "@apollo/client";


export const GET_COMMENT_POST = gql`
    query getCommentPost($postId: ID!) {
      getCommentPost(postID: $postId){
        id
        user {
          firstName
          lastName
          profile
        }
        content
        liked
        likeCount
        comments {
            id
            content
            liked
            likeCount
            user {
              firstName
              lastName
              profile
            }
        }
      }
    }
`
