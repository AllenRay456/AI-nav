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
import { toast } from "@/components/ui/use-toast"

const FormSchema = z
  .object({
    // ID 字段通常在创建新记录时由数据库自动生成，所以在表单提交时可能不需要。
    // id: z.string().optional(),
    icon: z.string(),
    title: z.string().min(1),
    description: z.string(),
    // key 是可选字段，根据你的 Prisma 模型
    key: z.string().optional(),
    rank: z.coerce.number().optional(),
    // 因为创建时间和更新时间通常是由数据库自动处理的，所以在表单架构中不需要它们
  })

export default function IndexPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const linkId = searchParams.get("id")

  useEffect(() => {
    if (linkId) {
      fetch(`/api/admin/getCateDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: linkId }),
      })
        .then((res) => res.json())
        .then((data) => {
          // form.reset(data) // Use the fetched data to set form values
          // form.setValue("cid", data.cid)
          form.setValue("description", data.description || "")
          form.setValue("title", data.title || "")
          // form.setValue("url", data.url || "")
          form.setValue("icon", data.icon || "")
          form.setValue("key", data.key || "")
          form.setValue("rank", data.rank || 100)
          // form.setValue("status", data.status || 1)
        })
        .catch((error) => {
          console.error("Failed to fetch link:", error)
          toast({
            title: "加载错误",
            description: "无法加载链接数据",
            variant: "destructive",
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkId])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      key: "",
      description: "",
      icon: "",
      // url: "",
      // status: 1,
      rank: 100,
      // cid: categoryMap[0].cid,
    },
  })

  async function creatOrUpdate(data?: z.infer<typeof FormSchema>) {
    if (!data) {
      return
    }
    const endpoint = linkId ? `/api/admin/cateUpdate` : "/api/admin/cateCreat"
    const { title, key, icon, description, rank } = data
    const req = linkId
      ? { id: linkId, title, key, icon, description, rank}
      : data
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
    if (res.status === 200) {
      toast({
        title: "操作成功",
        description: "返回列表页",
      })
      router.push("/admin/cateList")
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
    creatOrUpdate(data)
  }

  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col gap-8 p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-4"
        >
          <FormField
            key="title"
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2 space-y-0">
                <FormLabel className="w-20 shrink-0">Title</FormLabel>
                <FormControl>
                  <Input className="shrink-0" placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            key="description"
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2 space-y-0">
                <FormLabel className="w-20 shrink-0">Description</FormLabel>
                <FormControl>
                  <Input
                    className="shrink-0"
                    placeholder="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="key"
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2 space-y-0">
                <FormLabel className="w-20 shrink-0">Key</FormLabel>
                <FormControl>
                  <Input className="shrink-0" placeholder="key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="icon"
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2 space-y-0">
                <FormLabel className="w-20 shrink-0">Icon</FormLabel>
                <FormControl>
                  <Input className="shrink-0" placeholder="icon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="rank"
            control={form.control}
            name="rank"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2 space-y-0">
                <FormLabel className="w-20 shrink-0">Rank</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="shrink-0"
                    placeholder="rank"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className="flex justify-center gap-2 space-y-0 self-stretch">
            <Button type="submit">Submit</Button>
          </FormItem>
        </form>
      </Form>
    </div>
  )
}
