"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import useSWR from "swr";
import { Message } from "../types/message";
import { fetcher } from "../constants";

type MessageBubbleProps = Message;
type MessageListProps = {
  id: string;
  onRefetch?: () => void;
  messages: Message[];
};

export const MessageList = forwardRef(function MesageListComp(
  { id: clientId, messages = [] }: MessageListProps,
  ref: any
) {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      localRef.current?.scrollTo(0, localRef.current.scrollHeight);
    },
  }));

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={localRef}>
      {messages?.map((message) => {
        if (message.userId !== clientId) {
          return renderServerMessage(message);
        }
        return renderClientMessage(message);
      })}
    </div>
  );
});

export default MessageList;

function renderServerMessage(props: MessageBubbleProps) {
  return (
    <div className="flex items-start gap-3" key={props.message}>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarImage />
        <AvatarFallback className="AvatarFallback">
          {props.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted text-muted-foreground px-4 py-3 rounded-lg max-w-[75%]">
        <p>{props.message}</p>
        <div className="text-xs text-muted-foreground mt-1">
          {/* {props.date} */}
          2024-07-04
        </div>
      </div>
    </div>
  );
}

function renderClientMessage(props: MessageBubbleProps) {
  return (
    <div className="flex items-start gap-3 justify-end" key={props.message}>
      <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg max-w-[75%]">
        <p>{props.message}</p>
        <div className="text-xs text-primary-foreground/80 mt-1">
          {/* {props.date} */}
          2024-07-04
        </div>
      </div>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarImage />
        <AvatarFallback className="AvatarFallback">
          {props.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
