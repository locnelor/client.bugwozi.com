import { ApolloClient, DocumentNode, HttpLink, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers"
import { onError } from "@apollo/client/link/error"

import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
    const token = cookies().get("token")?.value
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                console.log(
                    `[Graphql error]: Message:${message},Location:${locations},path:${path}`
                )
            })
        }
        if (networkError) console.log(`[Network error]:${networkError}`)
    })
    console.log("token = " + cookies().get("token"))
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            },
        };
    });
    const httpLink = createHttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    })
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: from([errorLink, httpLink, authLink]),
    });
});
export const getQuery = async <T>(query: DocumentNode) => {
    const result = await getClient().query<T>({ query }).catch((error) => {
        console.log("error", error, "error")
        return { data: null, error }
    })
    return result
}