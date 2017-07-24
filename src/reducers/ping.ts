import { ACTION_PING, ACTION_PONG } from '../constants';

export type PingState = {
  isPinging: boolean;
};

export type PingAction = {
  type: string;
};

export function ping(state: PingState = {isPinging: false}, action: PingAction) {
  switch (action.type) {
    case ACTION_PING:
      return {
        ...state,
        isPinging: true
      };
    case ACTION_PONG:
      return {
        ...state,
        isPinging: false
      };
    default:
      return state;
  }
}
