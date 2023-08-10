import {gql} from "@apollo/client";


export const GET_POSTS = gql`
    query getPosts($pagination: Pagination!) {
      getPosts(pagination: $pagination){
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
`
