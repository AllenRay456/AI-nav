"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link as SiteLink } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { categoryMap } from "@/config/site"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  title: z.string(),
  cid: z
    .string()
    .optional()
    .refine((val) => val === null || 2, {
      message: "提供的类别值必须至少为2。",
    }),
})

export default function IndexPage() {
  const router = useRouter()
  const [list, setList] = useState([] as SiteLink[])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      cid: categoryMap[1].cid,
    },
  })

  async function fetchList(data?: z.infer<typeof FormSchema>) {
    const res = await fetch("/api/admin/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data ? data : {}),
    })
    if (res.status === 200) {
      toast({
        title: "获取列表成功",
      })
      const list = await res.json()
      setList(list)
    } else {
      const { error } = await res.json()
      toast({
        title: "Something went wrong.",
        description: error,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchList(form.getValues())
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    fetchList(data)
  }

  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col gap-8 px-8">
      <div className="mt-20 flex gap-4">
        <Link href="/" className="border bg-gray-300 p-1">
          返回主页
        </Link>
        <Link href="/admin/creat" className="border bg-gray-300 p-1">
          新建AI工具
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap items-center gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cid"
            render={({ field }) => (
              <FormItem className="flex shrink-0 items-center gap-2 space-y-0">
                <FormLabel className="shrink-0">分类</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="min-w-0">
                    <SelectTrigger>
                      <SelectValue placeholder="搜索分类" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryMap.map((category) => (
                      <SelectItem key={category.cid} value={category.cid}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div>
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Url</TableHead>
              <TableHead>category</TableHead>
              <TableHead>管理</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((link) => (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell className="font-medium">{link.title}</TableCell>
                <TableCell>{link.key || '-'}</TableCell>
                <TableCell>{link.rank}</TableCell>
                <TableCell>{link.url}</TableCell>
                <TableCell>
                  {categoryMap.find((i) => link.cid === i.cid)?.title}
                </TableCell>
                <TableCell className="w-20">
                  <Link href={`/admin/creat?id=${link.id}`}>编辑</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
