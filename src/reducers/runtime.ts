import { ACTION_SET_RUNTIME_VARIABLE } from '../constants';

export type RuntimeState = {
  [key: string]: string;
};

export type RuntimeAction = {
  type: string;
  payload: {
    name: string,
    value: string
  }
};

export function runtime(state: RuntimeState = {}, action: RuntimeAction) {
  switch (action.type) {
    case ACTION_SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
