import Detail from "@/app/components/detail";
import { api } from "@/utils/trpc-server";
export default async function Home() {
  const data = await api.hello({ text: "world" });
  return (
    <div>
      <span>{data.greeting}</span>
      <Detail />
    </div>
  );
}
