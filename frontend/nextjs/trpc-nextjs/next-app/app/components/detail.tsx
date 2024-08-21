"use client";

import { trpc } from "@/utils/trpc";

export default function Detail() {
  const { data, isLoading } = trpc.user.getUser.useQuery("");

  if (isLoading) return <div>加载中...</div>;

  return <div>Detail: {JSON.stringify(data)}</div>;
}
