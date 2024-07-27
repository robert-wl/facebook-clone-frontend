import { gql } from "@apollo/client";

export const CREATE_IMAGE_STORY = gql`
  mutation createImageStory($story: NewImageStory!) {
    createImageStory(input: $story) {
      id
      user {
        firstName
        lastName
        username
      }
      text
    }
  }
`;
