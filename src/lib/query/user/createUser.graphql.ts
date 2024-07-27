import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation createUser($user: NewUser!) {
    createUser(input: $user) {
      id
      firstName
      lastName
      username
      email
      dob
      gender
      active
    }
  }
`;
