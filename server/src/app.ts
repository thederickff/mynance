import cors from 'cors';
import express, { json, Router } from 'express';
import { Request, Response } from "express";

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
router.get('/hello', (req: Request, res: Response) => {
  res.status(200).send({ message: req.query.message });
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
