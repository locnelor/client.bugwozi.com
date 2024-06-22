"use client"
import { Avatar, Button, Flex, Layout } from "antd";
import Link from "next/link";
import UserButton from "./UserButton";


const Header = () => {
    return (
        <Layout.Header className="shadow">
            <Flex justify="space-between">
                <Link href="/">
                    <Avatar shape="square">
                        Bug
                    </Avatar>
                </Link>
                <Flex>
                    <UserButton />
                </Flex>
            </Flex>
        </Layout.Header>
    )
}
export default Header