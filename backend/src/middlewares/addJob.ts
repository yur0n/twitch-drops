import { Request, Response } from 'express';
import jobModel from '../models/job.model';
import botModel from '../models/bot.model';


export async function addJob (req: Request, res: Response) {
	const { bots, name, game, note }: { bots: string[], name: string, game: string, note?: string } = req.body;
	try {
		const job = await jobModel.create({ game, name, token: bots[0], note });
		bots.forEach(async (token) => {
			const bot = await botModel.findOneAndUpdate({ token }, { active: true, job: job._id });
			// do job here	
			console.log(bot)
		});
		return res.send({ ok: true, status: 201 });
	} catch (error) {
		console.log('Error adding bots:', error);
		return res.send({ ok: false, status: 207 });
	}
}