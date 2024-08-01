"use server";

import { BASE_URL } from "@/lib/constant";
import { CLIENT_ID } from "../constants";
import { Message, SendMessageParams } from "../types/message";

export async function sendMessages<T>({
  message,
  userId = CLIENT_ID,
  name = "WebServer",
  createdAt = new Date().getTime(),
}: Message) {
  const payload: Message = {
    name: name,
    message: message,
    createdAt: createdAt,
    userId: userId,
  };
  console.log("payload", payload);
  const response = await fetch(`${BASE_URL}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const res = await response.json();
  return res?.data ?? [];
}

export async function clearMessages() {
  const response = await fetch(`${BASE_URL}/clear`, {
    method: "DELETE",
  });
  const res = await response.json();
  return res?.data ?? [];
}
