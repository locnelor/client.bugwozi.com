"use client"

import { ApolloLink, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context";
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr"
import { getCookie } from "./cookie";


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
    const link = new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    })
    const httpLink = authLink.concat(link);
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: typeof window === "undefined" ? ApolloLink.from([
            new SSRMultipartLink({
                stripDefer: true,
            }),
            httpLink
        ]) : httpLink
    })
}
export const ApolloWrapper = ({ children }: React.PropsWithChildren) => (
    <ApolloNextAppProvider makeClient={makeClient}>
        {children}
    </ApolloNextAppProvider>
)