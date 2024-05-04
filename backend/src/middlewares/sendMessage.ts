import { Request, Response } from 'express';
import messageModel from '../models/message.model';
import { Telegram } from '../interfaces/telegram.interface';
const BOT = process.env.BOT_TOKEN;

export async function sendMessage (req: Request, res: Response) {
  const { data, message }: Telegram = req.body;
  if (!data || !message) {
    return res.send({ ok: false, status: 400 });
  }
  const result: { delivered: boolean, id: string }[] = []
  for (const user of data) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage?chat_id=${user.chatId}&text=${message}`);
      const responseData = await response.json();
      if (responseData.ok) {
        result.push({ delivered: true, id: user.userId });
        await messageModel.create({ userId: user.userId, telegram: user.chatId, message, user: false });
      } else {
				result.push({ delivered: false, id: user.userId });
			}
    } catch (e) {
      console.error(e);
      result.push({ delivered: false, id: user.userId });
    }
  }
  let status = 201, ok = true;
  if (result.some(item => item.delivered === false)) {
    ok = false;
    if (data.length > 1) {
      status = 207;
    } else {
      status = 400;
    }
  }
  return res.send({ ok, status, result });
}