import { Request, Response } from 'express';
import botModel from '../models/bot.model';


export async function addBots (req: Request, res: Response) {
	try {
		const bots = req.body;
		await botModel.insertMany(bots);
		return res.send({ ok: true, status: 201 });
	} catch (error) {
		console.log('Error adding bots:', error);
		return res.send({ ok: false, status: 207 });
	}
}