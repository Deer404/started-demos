"use client";

import { clientApi } from "@/utils/trpc-client";

function Detail() {
  const { data, isLoading } = clientApi.hello.useQuery({ text: "world" });

  if (isLoading) return <div>加载中...</div>;

  return <div>Detail: {JSON.stringify(data)}</div>;
}
