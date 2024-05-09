import { Request, Response } from 'express';
import { Twitch } from '../classes/twitch';


export async function getBotDrops (req: Request, res: Response) {
	try {
		const token = req.query.token;
		if (!token) {
			return res.send({ ok: false, status: 206 });
		}
		const twitch = new Twitch(token.toString());
		const data = await twitch.getUserDrops();
		res.send({ ok: true, status: 200, data });
	} catch (error) {
		console.log('Error getting bot drops:', error);
		return res.send({ ok: false, status: 207 });
	}
}