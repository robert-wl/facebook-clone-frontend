import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
	uri: "http://localhost:8080/query",
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: "ws://localhost:8080/query",
	}),
);

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
	};
});

const splitLink = split(
	({ query }) => {
		const definition = query.definitions[0];
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(httpLink),
);

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});
