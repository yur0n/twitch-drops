import app from './app';
import { connect } from 'mongoose';
import { environment } from './environments/environment';
import saveCampaigns from './jobs/saveCampaigns';
import botModel from './models/bot.model';
import jobModel from './models/job.model';

const PORT = process.env.PORT || 5000;

// добавить воркинг групс, добавить шоу на бота(брать токен бота и делать кол к твичу, сейвть в дб и показывать лист уже оттуда)
// добавить мейн токен для джоб, что бі чекать прогресс сразу по всем ботам
// юзать токен каждого бота при чеке его инвентаря, создать кастомній бокс для вівода анализа

connect(environment.DB_URI)
.then(async () => {
	// saveCampaigns();
	// try {
	// 	await botModel.deleteMany({});
	// 	await botModel.insertMany(bots);
	// 	await jobModel.deleteMany({});
	// 	await jobModel.insertMany(jobs);
	// } catch (error) {
	// 	console.log('error seeding db:', error);
	// }

	console.log('Connected to MongoDB');
	const server = app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
	server.on('error', console.error);
})
.catch((error) => {
	console.log('Error connecting to MongoDB:', error.message);
});

// const jobs = [
// 	{
// 		name: 'Some Job1',
// 		game: 'Some Game1',
// 		status: true,
// 		note: 'note1',
// 		token: 'sandkjasdjkd'
// 	},
// 	{
// 		name: 'Some Job2',
// 		game: 'Some Game2',
// 		status: false,
// 		note: 'note2',
// 		token: 'token2'
// 	},
// 	{
// 		name: 'Some Job3',
// 		game: 'Some Game3',
// 		status: true,
// 		note: 'note3',
// 		token: 'adsa78t32478128gd9182'
// 	},
// ]

// const bots = [
// 	{
// 		login: 'bot1',
// 		password: 'password1',
// 		token: 'kadsndsadknjasdjnasj213123',
// 		email: 'email1',
// 		emailPassword: 'emailPassword1'
// 	},
// 	{
// 		login: 'bot2',
// 		password: 'password2',
// 		token: 'kasnddsadknjasdjnasj213123',
// 		email: 'email2',
// 		emailPassword: 'emailPassword2'
// 	},
// 	{
// 		login: 'bot3',
// 		password: 'password3',
// 		token: 'kasnd2d133sadknjasdjnasj213123',
// 		email: 'email1',
// 		emailPassword: 'emailPassword3'
// 	},
// 	{
// 		login: 'bot4',
// 		password: 'password4',
// 		token: 'kasnd2133saddknjasdjnasj213123',
// 		email: 'email4',
// 		emailPassword: 'emailPassword4'
// 	},
// 	{
// 		login: 'bot5',
// 		password: 'password5',
// 		token: 'kasnd2133sadknjdasdjnasj213123',
// 		email: 'email5',
// 		emailPassword: 'emailPassword5'
// 	}
// ];