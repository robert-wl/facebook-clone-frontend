import {gql} from "@apollo/client";


export const CHECK_ACTIVATE_LINK = gql`
    query checkActivateLink($id: String!){
      checkActivateLink(id: $id)
    }    
`
