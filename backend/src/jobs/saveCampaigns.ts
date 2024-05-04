import Game from '../models/game.model';
import DropCampaign from '../models/dropCampaign.model';
import { Twitch } from '../classes/twitch';

async function job (token = process.env.MASTER_TOKEN) {
	if (!token) return;
	const twitch = new Twitch(token);
	const data = await twitch.getDropCampaigns() as IGame[];
	if (!data) return;
	await Game.deleteMany({});
	await DropCampaign.deleteMany({});

	data.forEach(async (game) => {
		const newGame = new Game({ name: game.game });
		await newGame.save();
		game.campaigns.forEach(async (campaign) => {
			const newCampaign = new DropCampaign({ gameId: newGame._id, ...campaign });
			await newCampaign.save();
		});
	});
}

export default job;

interface IGame {
	game: string;
	campaigns: {
		name: string;
		id: string;
		start: Date;
		end: Date;
	}[];
}