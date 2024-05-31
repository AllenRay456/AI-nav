import Link from "next/link"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <main className="flex">
    <aside className="w-100 flex flex-col bg-gray-100">
        <h1 className="text-red flex h-40 flex-col justify-center text-lg">AI专业导航管理</h1>

        <Link href={'/'} className="bg-gray-200 px-10 py-4 hover:bg-gray-300 hover:font-medium hover:text-red-300">导航主页</Link>
        <Link href={'/admin/cateList'} className="bg-gray-200 px-10 py-4 hover:bg-gray-300 hover:font-medium hover:text-red-300">分类列表</Link>
        <Link href={'/admin/cateCreat'} className="bg-gray-200 px-10 py-4 hover:bg-gray-300 hover:font-medium hover:text-red-300">新增分类</Link>
        <Link href={'/admin/list'} className="bg-gray-200 px-10 py-4 hover:bg-gray-300 hover:font-medium hover:text-red-300">工具列表</Link>
        <Link href={'/admin/creat'} className="bg-gray-200 px-10 py-4 hover:bg-gray-300 hover:font-medium hover:text-red-300">新增工具</Link>
    </aside>
    <section>{children}</section>
    </main>
  }