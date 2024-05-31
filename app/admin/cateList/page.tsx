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

  async function fetchList() {
    const res = await fetch("/api/admin/getCateList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data ? data : {}),
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
      await fetchList()
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit() {
    fetchList()
  }

  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col gap-8 p-8">

      <div>
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Rank</TableHead>
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
                <TableCell className="w-20">
                  <Link href={`/admin/cateCreat?id=${link.id}`}>编辑</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
