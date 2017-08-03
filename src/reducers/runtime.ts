import {
  ACTION_SET_RUNTIME_VARIABLE,
  ACTION_SET_RUNTIME_ERROR
} from '../constants';
import {
  SetRuntimeErrorPayload,
  SetRuntimeVariablePayload
} from '../actions';

export type RuntimeState = {
  variables: {
    [key: string]: string;
  },
  error?: SetRuntimeErrorPayload
};

export type RuntimeAction = {
  type: string;
  payload: object;
};

export function runtime(state: RuntimeState = {variables: {}}, action: RuntimeAction) {
  switch (action.type) {
    case ACTION_SET_RUNTIME_VARIABLE:
      const payload = <SetRuntimeVariablePayload> action.payload;
      return {
        ...state,
        variables: {
          ...state.variables,
          [payload.name]: payload.value
        }
      };
    case ACTION_SET_RUNTIME_ERROR:
      return {
        ...state,
        error: <SetRuntimeErrorPayload> action.payload
      };
    default:
      return state;
  }
}
