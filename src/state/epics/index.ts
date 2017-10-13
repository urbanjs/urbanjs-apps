import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';

import { Observable } from 'rxjs';
import { Action } from 'redux';
import { combineEpics } from 'redux-observable';
import { RootState } from '../reducers';
import { ping } from './ping';
import { runtime } from './runtime';
import { graphql } from './graphql';

export const root = combineEpics<Action, RootState>(
  ping(),
  runtime(Observable.ajax),
  graphql()
);
