import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { ACTION_PING } from '../constants';
import { pong } from '../actions/ping';

export const ping = (action$: ActionsObservable<Action>) => {
  return action$
    .filter((action: Action) => action.type === ACTION_PING)
    .delay(1000)
    .mapTo(pong());
};
