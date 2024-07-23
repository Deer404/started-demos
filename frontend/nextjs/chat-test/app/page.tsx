/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZglXX89qJ9v
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link";
import { useMemo } from "react";

export default function ChatPage() {
  const randomId = useMemo(() => {
    return Math.random().toString(36).substring(7);
  }, []);
  return (
    <div className="flex flex-col h-full max-h-[600px] w-full max-w-xl mx-auto bg-background rounded-lg shadow-lg overflow-hidden">
      <Link href={`/chat/${randomId}`}>Go To Chat</Link>
    </div>
  );
}
