import {gql} from "@apollo/client";


export const CREATE_POST = gql`
    mutation createPost($post: NewPost!){
       createPost(newPost: $post){
        id
        content
        privacy
        likeCount
      }
    }
`
