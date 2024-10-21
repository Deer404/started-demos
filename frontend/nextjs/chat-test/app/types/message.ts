export type Message = {
  name: string;
  message: string;
  createdAt: number;
  userId?: string;
};
export type SendMessageParams = Omit<Message, "date">;
