import Link from "next/link";

export function SiteFooter() {
  return (
    <div className="absolute bottom-0 mx-auto w-full text-sm md:px-6 ">
      <footer className="block py-4">
        <div className="mx-auto">
          <div className="mb-2 text-center md:mb-0">
            发现最新最好用的通用和垂直 AI 工具
          </div>
          <Link href='/about' className="block text-center text-gray-800">关于我们</Link>
          <div className="flex justify-center gap-x-1 text-red-400">
            <Link href="https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e" target="blank">通往 AGI 之路</Link>|
            <Link href="https://baoyu.io/blog" target="blank">宝玉的分享</Link>|
            <Link href="/rank/aitop100" target="blank">全球AI工具Top100</Link>|
            <Link href="/rank/china-ai-top50" target="blank">中国AI工具Top50</Link>|
            <Link href="/rank/a16z-top-100-ai-web-apps" target="blank">2023年度AI工具Top100</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
