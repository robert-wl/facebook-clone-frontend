import {gql} from "@apollo/client";


export const GET_FRIENDS = gql`    
    query getFriends{
      getFriends{
        sender {
          id
          firstName
          lastName
          username
          profile
        }
        receiver {
          id
          firstName
          lastName
          username
          profile
        }
        accepted
      }
}
`
