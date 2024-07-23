export type Message = {
  name: string;
  message: string;
  date: string;
  userId?: string;
};
export type SendMessageParams = Omit<Message, "date">;
