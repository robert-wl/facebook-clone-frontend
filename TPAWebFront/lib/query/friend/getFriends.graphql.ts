import {gql} from "@apollo/client";


export const GET_FRIENDS = gql`    
    query getFriends{
      getFriends{
        sender {
          firstName
          lastName
          username
          profile
        }
        receiver {
          firstName
          lastName
          username
          profile
        }
        accepted
      }
}
`
