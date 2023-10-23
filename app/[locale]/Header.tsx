"use client"

import { Avatar, Box, Container, Flex, Kbd, Section, Text, useThemeContext } from "@radix-ui/themes"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useMemo } from "react"
// import 

const Header = () => {
    const t = useTranslations("title")
    const { resolvedTheme } = useTheme()

    const menu = useMemo(() => {
        return [{
            href: "/article"
        },  {
            href: "/"
        }]
    }, []);
    return (
        <Box>
            <Section size="1">
                <Container>
                    <Flex gap='2'>
                        <Flex align="center" gap="1">
                            <Avatar
                                src="/"
                                fallback="B"
                            />
                            <Text className="hidden font-bold sm:inline-block">Bug窝子</Text>
                        </Flex>
                        <Flex align="center" gap="1">
                            <div className={`rounded-md px-2`}>
                                <Link href="/article">
                                    article
                                </Link>
                            </div>

                        </Flex>
                    </Flex>
                </Container>
            </Section>
        </Box>
    )
}
export default Header