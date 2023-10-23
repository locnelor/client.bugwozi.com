import { ApolloWrapper } from '@/lib/apollo-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from '@apollo/client/utilities/globals';
import { LayoutProps } from '@/types/LayoutProps';
import Providers from '@/lib/Providers';
import Header from './Header';
import { Box } from '@radix-ui/themes';
import './globals.css'

if (__DEV__) {
    loadDevMessages();
    loadErrorMessages();
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: LayoutProps) {
    const messages = await getMessages(locale)

    return (
        <html suppressHydrationWarning lang={locale}>
            <body className="min-h-screen overflow-x-hidden">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Providers>
                        <ApolloWrapper>
                            <Box>
                                <Header />
                                {children}
                            </Box>
                        </ApolloWrapper>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}