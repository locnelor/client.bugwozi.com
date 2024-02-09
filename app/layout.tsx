import type { Metadata } from "next";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloWrapper } from "@/lib/apollo-provider";
import Header from "./Header";
import "./globals.css";
import Footer from "./Footer";
const __DEV__ = process.env.NODE_ENV !== "production"
if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <ApolloWrapper>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
