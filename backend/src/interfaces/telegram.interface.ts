export interface Telegram {
  message: string;
  data: {
    userId: string;
    chatId: string;
  }[];
  file?: string;
}