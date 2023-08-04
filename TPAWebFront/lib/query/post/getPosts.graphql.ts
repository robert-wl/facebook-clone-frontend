import {gql} from "@apollo/client";


export const GET_POSTS = gql`
    query getPosts {
      getPosts{
        id
      
        user {
          firstName
          lastName
        }
        content
        privacy
        likeCount
        commentCount
        shareCount
        comments {
          id
          content
        }
        files
        createdAt
      }
    }
`
