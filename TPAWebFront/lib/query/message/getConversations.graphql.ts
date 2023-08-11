import { gql } from "@apollo/client";

export const GET_CONVERSATIONS = gql`
	query getConversations {
		getConversations {
			id
			users {
				user {
					id
					firstName
					lastName
					username
					profile
				}
			}
			messages {
				message
			}
		}
	}
`;
