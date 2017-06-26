import {ACTION_PING, ACTION_PONG} from '../constants';

export function ping() {
  return {type: ACTION_PING};
}

export function pong() {
  return {type: ACTION_PONG};
}
