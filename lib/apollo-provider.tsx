"use client"

import { ApolloLink, HttpLink, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context";
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr"
import { getCookie } from "./cookie";
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from "@apollo/client/utilities";

const makeClient = () => {
    const authLink = setContext((_, { headers }) => {
        const token = getCookie("token")
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            },
        };
    });
    const httpLink = authLink.concat(new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    }))
    const wsLink = new GraphQLWsLink(
        createClient({
            url: `${process.env.NEXT_PUBLIC_WSGRAPHQL}/graphql`,
            connectionParams: () => {
                const token = getCookie("token")
                return {
                    Authorization: `Bearer ${token}`,
                };
            },
        }),
    );
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: typeof window === "undefined" ? ApolloLink.from([
            new SSRMultipartLink({
                stripDefer: true,
            }),
            splitLink
        ]) : splitLink
    })
}
export const ApolloWrapper = ({ children }: React.PropsWithChildren) => (
    <ApolloNextAppProvider makeClient={makeClient}>
        {children}
    </ApolloNextAppProvider>
)