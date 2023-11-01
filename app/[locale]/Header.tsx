"use client"

import { Avatar, Box, Button, Container, Flex, Kbd, Section, Text, useThemeContext } from "@radix-ui/themes"
import { useTranslations, useLocale, useLocalizedRouter } from "next-intl"
import { usePathname } from "next-intl/client"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useCallback, useMemo } from "react"
// import 

const Header = () => {
    const t = useTranslations("title")
    const locale = useLocale();
    const router = useLocalizedRouter();
    const pathname = usePathname();


    const { resolvedTheme, setTheme } = useTheme()

    const menu = useMemo(() => {
        return [{
            href: "/article"
        }, {
            href: "/"
        }]
    }, []);

    const onClick = useCallback(() => {
        if (resolvedTheme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }, [resolvedTheme]);
    const onChangeLanguage = useCallback(() => {
        console.log(pathname)
        if (locale === "en") {
            router.push(pathname, { locale: "zh" })
        } else {
            router.push(pathname, { locale: "en" })
        }
    }, [locale, pathname]);
    return (
        <Box>
            <Section size="1">
                <Container>
                    <Flex gap='2'>
                        <Flex align="center" gap="1">
                            <Link href="/">
                                <Avatar
                                    src="/"
                                    fallback="B"
                                />
                                <Text className="hidden font-bold sm:inline-block">Bug窝子</Text>
                            </Link>
                        </Flex>
                        <Flex align="center" gap="1">
                            <div className={`rounded-md px-2`}>
                                <Link href="/article">
                                    article
                                </Link>
                            </div>
                            <Button
                                onClick={onClick}
                            >
                                setTheme
                            </Button>
                            <Button
                                onClick={onChangeLanguage}
                            >
                                setLanguage
                            </Button>
                        </Flex>
                    </Flex>
                </Container>
            </Section>
        </Box>
    )
}
export default Header