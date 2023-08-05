import {gql} from "@apollo/client";


export const CREATE_COMMENT = gql`
    mutation createComment($newComment: NewComment!){
      createComment(newComment: $newComment) {
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
`
