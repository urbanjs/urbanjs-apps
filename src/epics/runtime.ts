import { MiddlewareAPI } from 'redux';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { ACTION_SET_RUNTIME_ERROR } from '../constants';
import { SetRuntimeErrorPayload } from '../actions';
import { RootState } from '../reducers';

export type RuntimeErrorAction = { payload: SetRuntimeErrorPayload };

export const runtime = (action$: ActionsObservable<RuntimeErrorAction>, store: MiddlewareAPI<RootState>) => {
  return action$.ofType(ACTION_SET_RUNTIME_ERROR)
    .mergeMap((action) =>
      Observable.ajax({
        url: `${store.getState().runtime.variables.hostOrigin}/api/v1/report/error`,
        method: 'POST',
        body: {
          error: action.payload
        },
        withCredentials: true
      })
    );
};
