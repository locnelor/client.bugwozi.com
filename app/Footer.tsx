import Link from "next/link"


const Footer = () => {

    return (
        <div>
            <footer className="footer relative footer-center p-10 bg-base-200 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <Link href="/about" className="link link-hover">关于我们</Link>
                    <Link href="/about" className="link link-hover">课程合作</Link>
                    <Link href="/about" className="link link-hover">意见反馈</Link>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <span>友情链接</span>
                        <Link href="/">kgnb</Link>
                    </div>
                </nav>
                <aside>
                    <p>冀ICP备2024054498号</p>
                </aside>
            </footer>
        </div>
    )
}
export default Footer