import cors from 'cors';
import express, { json, Router } from 'express';
import { Request, Response } from "express";
import config from 'config';
import { Spot } from '@binance/connector';

const { apiKey, apiSecret } = config.get('binance');
const client = new Spot(apiKey, apiSecret);

const router = Router();
// Middlewares
router.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, false);
        return;
      }

      callback(null, true);
    }
  })
);

router.use(json({}));

// Routes
router.get('/account', async (req: Request, res: Response) => {
  const response = await client.account();
  res.status(200).send({ message: response.data });
});

router.get('/myTrades', async (req: Request, res: Response) => {
  const response = await client.myTrades('LTCUSDT');
  res.status(200).send({ message: response.data });
});

// Initialization
const app: express.Application = express();

app.use(router);

try {
  app.listen(3000, () => {
    console.log('Listening to port 3000')
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
