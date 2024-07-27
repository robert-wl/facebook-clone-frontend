import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      about
      privacy
      background
      isAdmin
      joined
      posts {
        id
        user {
          firstName
          lastName
          username
          profile
          email
          gender
          dob
        }
        content
        privacy
        likeCount
        commentCount
        shareCount
        liked
        comments {
          id
          content
        }
        files
        createdAt
      }
      members {
        user {
          id
          firstName
          lastName
          username
          profile
        }
        approved
        requested
        role
      }
      memberCount
      chat {
        id
      }
    }
  }
`;
