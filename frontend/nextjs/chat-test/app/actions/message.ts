"use server";

import { CLIENT_ID } from "../constants";
import { Message, SendMessageParams } from "../types/message";

export async function sendMessages<T>({
  message,
  userId = CLIENT_ID,
  name = "WebServer",
  date = new Date().toISOString(),
}: Message) {
  const payload: Message = {
    name: name,
    message: message,
    date: date,
    userId: userId,
  };
  const response = await fetch("http://192.168.160.93:8080/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const res = await response.json();
  return res?.data ?? [];
}
