import Link from "next/link"


const Footer = () => {

    return (
        <div>
            <footer className="footer relative footer-center p-10 bg-base-200 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <Link href="/posts/68211ab2c4825bd0634056a994ca1bd0" className="link link-hover">关于我们</Link>
                    <Link href="/posts/85fc2525db937773ec3a890ade453007" className="link link-hover">课程合作</Link>
                    <Link target="_blank" href="https://support.qq.com/products/639696" className="link link-hover">意见反馈</Link>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <span>友情链接:</span>
                        <span>暂无!欸嘿!</span>
                        {/* <Link href="/">kgnb</Link> */}
                    </div>
                </nav>
                <aside>
                    <p>
                        <Link target="_blank" href="beian.miit.gov.cn">
                            冀ICP备2024054498号
                        </Link>
                    </p>
                </aside>
            </footer>
        </div>
    )
}
export default Footer