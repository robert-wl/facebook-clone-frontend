import {gql} from "@apollo/client";

export const AUTHENTICATE_USER = gql`
    mutation authenticateUser($email: String!, $password: String!){
      authenticateUser(email: $email, password: $password)
    }
`
