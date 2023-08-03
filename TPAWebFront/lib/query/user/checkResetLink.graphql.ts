import {gql} from "@apollo/client";


export const CHECK_RESET_LINK = gql`
    query checkResetLink($id: String!){
      checkResetLink(id: $id)
    }    
`
