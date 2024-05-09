import { Request, Response } from 'express';
import jobModel from '../models/job.model';
import botModel from '../models/bot.model';
import { Twitch } from '../classes/twitch';
import { Bot } from '../interfaces/bot.interface';

const masterToken = process.env.MASTER_TOKEN!;
const minerAddress = process.env.MINER_ENDPOINT!;

export async function addJob (req: Request, res: Response) {
	const { bots, name, game, note }: { bots: string[], name: string, game: string, note?: string } = req.body;
	try {
		const twitch = new Twitch(masterToken);
		const streamers = (await twitch.getGameStreams(game)).join(',');
		if (!streamers.length) return res.send({ ok: false, status: 210, message: 'No streamers found' });

		const job = await jobModel.create({ name, game, token: bots[0], note });
		const botsToWork: Bot[] = [];
		for (const token of bots) {
			const bot = await botModel.findOneAndUpdate({ token }, { active: true, job: job._id });
			if (bot) botsToWork.push(bot);
		}
		const isWorking = await watch(botsToWork, streamers);
		if (isWorking.ok) {
			return res.send({ ok: true, status: 201 });
		} else {
			return res.send({ ok: false, status: 207, message: 'Error, added bots won\'t work'});
		}
	} catch (error) {
		console.log('Error adding bots:', error);
		return res.send({ ok: false, status: 207 });
	}
}

async function watch (bots: Bot[], streamers: string) {

	return fetch(`${minerAddress}/mine`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ bots, streamers }),
	}).then(async (response) => {
		const data = await response.json();
		console.log('Watch response:', data);
		return { ok: true }
	}).catch((error) => {
		console.log('Error watching:', error);
		return { ok: false }
	});

	// bots.forEach(bot => {
	// 	const watcher = new Watcher(bot, streamers);
	// 	watcher.on('error', (error) => {
	// 		console.log(`Watcher ${bot.login} error:`, error);
	// 	});
	// 	watcher.on('log', (log) => {
	// 		console.log(`Watcher ${bot.login} log:`, log);
	// 	});
	// 	watcher.on('close', (code) => {
	// 		console.log(`Watcher ${bot.login} closed with code ${code}`);
	// 	});
	// });
}