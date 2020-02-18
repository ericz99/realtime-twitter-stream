import { Router } from 'express';
import twitterRoute from './routes/twitterRoute';

const app = Router();
twitterRoute(app);

export default app;
