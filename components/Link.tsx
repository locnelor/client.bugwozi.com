import NextLink from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"
import React from "react"
const Link = ({
    children,
    href
}: React.PropsWithChildren<{
    href: string
}>) => {

    return (
        <NextLink href={href}>
            <RadixLink>
                {children}
            </RadixLink>
        </NextLink>
    )
}
export default Link