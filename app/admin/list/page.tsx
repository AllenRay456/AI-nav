"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link as SiteLink } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {categoryMap} from '@/config/site'

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

  useEffect(() => {
    const fetchData = async () => {
      await fetchList()
    }
    fetchData()
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      cid: undefined,
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    fetchList(data)
  }

  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col gap-8 px-8">
      <div className="flex gap-4 pt-20">
        <Link href="/" className="border border-red-300 p-1">
          返回主页
        </Link>
        <Link href="/admin/list" className="border border-red-300 p-1">
          返回列表管理页
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
                  <Input placeholder="shadcn" {...field} />
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
      <Link href='/admin/creat'>
        <Button className="self-start">新建AI工具</Button>
      </Link>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Url</TableHead>
              <TableHead>category</TableHead>
              <TableHead>管理</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.id}</TableCell>
                <TableCell className="font-medium">{link.title}</TableCell>
                <TableCell>{link.url}</TableCell>
                <TableCell>{link.cid}</TableCell>
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
