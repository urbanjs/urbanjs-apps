import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';

import { combineEpics } from 'redux-observable';
import { ping } from './ping';

export const root = combineEpics(ping);
