import express from 'express';
import apiRoutes from './api';
import morgan from 'morgan';
import cors from 'cors';

import job from './test/child'


const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
  //X-Total-Count in the Access-Control-Expose-Headers
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/test', (req, res) => {
	const { login, password, streamers, token } = req.query;
	
	console.log(login, password, streamers, token);
	if (!login || !password || !streamers) {
		return res.status(400).send('login and password are required');
	}
	try {
		job(String(login), String(password), String(streamers), token ? String(token) : undefined);
		res.send('child started');
	} catch (e) {
		console.error(e);
		return res.status(500).send('internal server error');
	}
});

export default app;