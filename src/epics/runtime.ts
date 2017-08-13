import { MiddlewareAPI, Action } from 'redux';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { ACTION_SET_RUNTIME_ERROR, ACTION_SET_RUNTIME_ERROR_FULFILLED } from '../constants';
import { SetRuntimeErrorPayload } from '../actions';
import { RootState } from '../reducers';

export type RuntimeErrorAction = Action & { payload: SetRuntimeErrorPayload };

export const runtime = (action$: ActionsObservable<RuntimeErrorAction>, store: MiddlewareAPI<RootState>) => {
  return action$
    .filter((action: RuntimeErrorAction) => action.type === ACTION_SET_RUNTIME_ERROR)
    .mergeMap((action) =>
      Observable
        .ajax({
          url: `${store.getState().runtime.variables.serverOrigin}/api/v1/report/error`,
          method: 'POST',
          body: {
            error: action.payload
          },
          withCredentials: true
        })
        .map(() => ({
          type: ACTION_SET_RUNTIME_ERROR_FULFILLED
        }))
    );
};
