import {gql} from "@apollo/client";


export const UPDATE_USER = gql`   
    mutation updateUser($updateUser: UpdateUser!){
      updateUser(input: $updateUser){
        id
      }
    }
`
