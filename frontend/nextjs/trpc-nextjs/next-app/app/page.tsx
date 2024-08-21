import { helpers } from "@/utils/trpc-server";
import Detail from "@/app/components/detail";
export default async function Home() {
  const data = await helpers.hello.fetch({ text: "world" });
  return (
    <div>
      <span>{data.greeting}</span>
      <Detail />
    </div>
  );
}
