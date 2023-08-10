import {gql} from "@apollo/client";


export const CREATE_TEXT_STORY = gql`
    mutation createTextStory($story: NewTextStory!){
      createTextStory(input: $story) {
        id
        user {
          firstName
          lastName
          username
        }
        text
      } 
    }
`
