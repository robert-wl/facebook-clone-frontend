import {gql} from "@apollo/client";


export const GET_STORIES = gql`
    query getStories($username: String!){
      getStories(username: $username) {
        id
        image
        text
        font
        color
      }
    }
`
