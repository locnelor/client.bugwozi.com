import { Flex, Grid, Layout } from "antd"
import Link from "next/link"


const Footer = () => {

    return (
        <Layout.Footer>
            <div className="relative p-10 flex justify-between m-auto container">
                <Flex gap={8} vertical>
                    <Link href="/" className="link link-hover">关于我们</Link>
                    <Link href="/" className="link link-hover">商务合作</Link>
                    <Link target="_blank" href="/" className="link link-hover">意见反馈</Link>
                </Flex>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <span>友情链接:</span>
                        <span>locnelor</span>
                    </div>
                </nav>
                <aside>
                    <p>
                        <Link target="_blank" href="beian.miit.gov.cn">
                            冀ICP备114514号
                        </Link>
                    </p>
                </aside>
            </div>
        </Layout.Footer>
    )
}
export default Footer