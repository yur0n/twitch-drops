import { Router } from 'express';
import raExpressMongoose from 'express-mongoose-ra-json-server';
import dropCampaignModel from '../models/dropCampaign.model';
import gameModel from '../models/game.model';
import botModel from '../models/bot.model';
import jobModel from '../models/job.model';
import { addBots } from '../middlewares/addBots';
import { addJob } from '../middlewares/addJob';
import { getBotDrops } from '../middlewares/botDrops';

const router = Router();

router.use('/games', raExpressMongoose(gameModel, { q: ['name'] }))
router.use('/campaigns', raExpressMongoose(dropCampaignModel, { q: ['name'] }));
router.use('/bots', raExpressMongoose(botModel, { q: ['login', 'work'] }));
router.use('/jobs', raExpressMongoose(jobModel));

router.post('/add-bots', addBots);
router.post('/add-job', addJob);
router.get('/get-bot-drops', getBotDrops);

export default router;
