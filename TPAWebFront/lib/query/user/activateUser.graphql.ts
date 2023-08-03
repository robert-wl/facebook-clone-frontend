import {gql} from "@apollo/client";

export const ACTIVATE_USER = gql`
    mutation activateUser($id: String!){
      activateUser(id: $id){
        id
      }
    }
`
