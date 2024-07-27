import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile($profile: String!) {
    updateUserProfile(profile: $profile) {
      id
    }
  }
`;
