import express from 'express';
import mine from './middlewares/mine';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
	res.send('Hello from miner!');
});

app.post('/mine', mine);


export default app;