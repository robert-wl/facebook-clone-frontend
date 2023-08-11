import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
	mutation sendMessage($convID: ID!, $message: String, $image: String) {
		sendMessage(conversationID: $convID, message: $message, image: $image) {
			id
			message
			image
		}
	}
`;
