import * as express from 'express';
import * as cors from 'cors';
import {addGraphqlMiddleware} from '../graphql/server';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

addGraphqlMiddleware(app);

app.use(express.static('build'));

app.listen(PORT, () => console.info( // tslint:disable-line
  `Server is now running on http://localhost:${PORT}`
));
