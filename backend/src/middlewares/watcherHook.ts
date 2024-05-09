
import { Request, Response } from 'express';


export async function watcherHook (req: Request, res: Response) {
	const event = req.query.event_name;
	const message = req.query.message;
	if (!event || !message) {
		return res.send({ ok: false });
	}
	console.log('Event:', event); 
	console.log('Message:', message);
	res.send({ ok: true });
	// try {
	// 	const token = req.query.token;
	// 	console.log(req.query)
	// 	if (!token) {
	// 		return res.send({ ok: false, status: 206 });
	// 	}
	// 	const twitch = new Twitch(token.toString());
	// 	const data = await twitch.getUserDrops();
	// 	res.send({ ok: true, status: 200, data });
	// } catch (error) {
	// 	console.log('Error getting bot drops:', error);
	// 	return res.send({ ok: false, status: 207 });
	// }
}