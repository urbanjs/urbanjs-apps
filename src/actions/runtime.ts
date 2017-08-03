import { ACTION_SET_RUNTIME_VARIABLE, ACTION_SET_RUNTIME_ERROR } from '../constants';

export type SetRuntimeVariablePayload = {
  name: string;
  value: string | number | boolean;
};

export function setRuntimeVariable(payload: SetRuntimeVariablePayload) {
  return {
    type: ACTION_SET_RUNTIME_VARIABLE,
    payload
  };
}

export type SetRuntimeErrorPayload = {
  message: string;
  stack: string;
  componentStack?: string;
};

export function setRuntimeError(payload: SetRuntimeErrorPayload) {
  return {
    type: ACTION_SET_RUNTIME_ERROR,
    payload
  };
}
