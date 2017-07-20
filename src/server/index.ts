import {Router, Response, Request} from 'express';
import * as express from 'express';
import * as cors from 'cors';
import {join} from 'path';
import {createApolloRouter as graphql} from '../graphql/server';
import {DEV_MODE} from '../constants';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(graphql({devMode: DEV_MODE}));

app.use(express.static('build'));

const appRouter = Router();
appRouter.get('*', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../../build/index.html'));
});

app.use(appRouter);

app.listen(PORT, () => console.info( // tslint:disable-line
  `Server is now running on http://localhost:${PORT}`
));
