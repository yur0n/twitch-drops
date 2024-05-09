import express from 'express';
import apiRoutes from './api';
import webhookRoutes from './webhook';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
// app.use(morgan('dev'));
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
app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

export default app;