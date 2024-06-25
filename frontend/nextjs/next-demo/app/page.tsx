import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
async function getData() {
  const res = await axios.get("http://www.baidu.com/");

  return res.data;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex flex-col">
      Index
      <Link href="/test">To Test {JSON.stringify(data ?? "")}</Link>
    </main>
  );
}
