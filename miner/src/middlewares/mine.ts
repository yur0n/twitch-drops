import { Request, Response } from "express";
import { Watcher } from "../classes/watcher";
import { Bot } from "../interfaces/bot.interface";

const webhook = process.env.WEBHOOK_ENDPOINT!;

export default function mine(req: Request, res: Response) {
	const { bots, streamers }: { bots: Bot[], streamers: string} = req.body;
	console.log(bots, streamers);
	if (!bots || !streamers) {
		return res.send({ ok: false, status: 'Invalid request' });
	}

	bots.forEach(bot => {
		const watcher = new Watcher(bot, streamers);
		watcher.on('error', (error) => {
			notify('error', `Watcher ${bot.login} error: ${error}`);
			console.log(`Watcher ${bot.login} error:`, error);
		});
		watcher.on('log', (log) => {
			// notify('log', `Watcher ${bot.login} log: ${log}`);
			console.log(`Watcher ${bot.login} log:`, log);
		});
		watcher.on('close', (code) => {
			notify('close', `Watcher ${bot.login} closed with code ${code}`);
			console.log(`Watcher ${bot.login} closed with code ${code}`);
		});
	});

	res.send({ ok: true, status: 'Mining started' });

}

async function notify (event: string, message: string) {
	const response = await fetch(`${webhook}?event_name=${event}&message=${message}`);
	if (!response.ok) {
		console.error(`Failed to notify ${event} with message: ${message}`);
	}
}