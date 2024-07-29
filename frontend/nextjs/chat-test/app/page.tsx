import Link from "next/link";
import { useMemo } from "react";

export default function ChatPage() {
  const randomId = useMemo(() => {
    return Math.random().toString(36).substring(7);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#6a5acd] to-[#87ceeb]">
      <Link
        href={`/chat/${randomId}`}
        className="inline-flex items-center justify-center px-8 py-4 text-2xl font-medium text-white bg-primary rounded-lg shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        prefetch={false}
      >
        Go To Chat
      </Link>
    </div>
  );
}
