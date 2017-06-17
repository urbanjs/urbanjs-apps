import {ACTION_SET_RUNTIME_VARIABLE} from '../constants';

export function setRuntimeVariable({name, value}: { name: string, value: string }) {
  return {
    type: ACTION_SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value
    }
  };
}
