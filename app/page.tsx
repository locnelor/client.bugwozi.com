import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bug窝子"
}

export default function Home() {
  return (
    <div>
      <div className="h-96 mb-3 skeleton flex justify-center items-center">
        <h1>欢迎来到bug窝子</h1>
      </div>
      <div className="h-96 mb-3 skeleton flex justify-center items-center">
        <h1>专升本课程</h1>
      </div>
      <div className="h-96 mb-3 skeleton flex justify-center items-center">
        <h1>博客文章</h1>
      </div>
      <div className="h-96 mb-3 skeleton flex justify-center items-center">
        <h1>班级管理</h1>
      </div>
    </div>
  );
}
