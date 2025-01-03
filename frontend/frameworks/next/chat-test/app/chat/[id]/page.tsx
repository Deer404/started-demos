/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZglXX89qJ9v
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import MessageList from "@/app/components/MessageList";
import { clearMessages, sendMessages } from "@/app/actions/message";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/app/constants";
import useSWR from "swr";
import { Message } from "@/app/types/message";
import { BASE_URL } from "@/lib/constant";
type ChatPageProp = {
  params: {
    id: string;
  };
};
const getMsgListUrl = `${BASE_URL}/messages`;
export default function Page({ params }: ChatPageProp) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState<string | null>(null);
  const ref = useRef({ scrollToBottom: () => {} });
  const { data: messages, mutate } = useSWR<Message[]>(getMsgListUrl, fetcher);
  // const [optimisticMessage, addOptimisticMessage] = useOptimistic(
  //   messages,
  //   (state, newMessage: Message & { sending?: boolean }) => {
  //     return [...(state ?? []), { ...newMessage, sending: true }];
  //   }
  // );

  const handleClick = () => {
    if (message) {
      setMessage("");
      const msg = {
        message,
        userId: params.id,
        name: name ?? "Staff",
        createdAt: new Date().getTime(),
      };
      console.log("msg", msg);
      // addOptimisticMessage(sendMessage);
      sendMessages(msg)
        .then(() => {
          ref.current?.scrollToBottom();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      mutate();
    }, 1000);
    return () => clearInterval(id);
  }, [mutate]);

  return (
    <div className="flex flex-col p-5 h-full max-h-[600px] w-full max-w-2xl mx-auto bg-background rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-row items-center gap gap-2">
        <span>Name:</span>
        <Input
          aria-label="name"
          name="name"
          placeholder="Input Your Name:"
          onChange={(e) => setName(e.target.value)}
          value={name ?? ""}
        />
      </div>
      <div className="py-2 flex items-center">
        <span>userName:</span>
        <span>{name ?? "Staff"}</span>
        <div className="flex flex-row justify-end items-center flex-1 pr-1">
          <Button
            onClick={() => {
              clearMessages();
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center">
        <h2 className="text-lg font-medium">Chat with John</h2>
      </div>
      <MessageList id={params.id ?? ""} ref={ref} messages={messages ?? []} />
      <div className="bg-muted px-4 py-3 flex items-center gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none"
        />
        <Button onClick={handleClick}>Send</Button>
      </div>
    </div>
  );
}
