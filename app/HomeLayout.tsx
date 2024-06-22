"use client"

import { Layout } from "antd"
import { PropsWithChildren } from "react"
import Header from "./Header"
import Footer from "./Footer"



const HomeLayout = ({ children }: PropsWithChildren) => {
    return (
        <Layout>
            <Header />
            <Layout.Content className="pb-5 pt-1">
                {children}
            </Layout.Content>
            <Footer />
        </Layout>
    )
}
export default HomeLayout