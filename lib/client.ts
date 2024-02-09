import { ApolloError, DocumentNode, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers"

import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
    const token = cookies().get("token")?.value
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
        link: authLink.concat(httpLink),
    });
});
export const getQuery = async <T>(query: DocumentNode) => {
    const result = await getClient().query<T>({ query }).catch((error: ApolloError) => {
        return { data: undefined, error }
    })
    return result
}