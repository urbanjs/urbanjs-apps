import { MiddlewareAPI, Action } from 'redux';
import { AjaxRequest, AjaxResponse, Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import {
  ACTION_SET_RUNTIME_ERROR,
  ACTION_SET_RUNTIME_ERROR_FULFILLED,
  PATH_API_REPORT_ERROR
} from '../../constants';
import { SetRuntimeErrorPayload } from '../actions';
import { RootState } from '../reducers';

export type RuntimeErrorAction = Action & { payload: SetRuntimeErrorPayload };

export type AjaxMethod = (req: AjaxRequest) => Observable<AjaxResponse>;

export const runtime = (ajax: AjaxMethod) =>
  (action$: ActionsObservable<RuntimeErrorAction>, store: MiddlewareAPI<RootState>) => {
    return action$
      .filter((action: RuntimeErrorAction) => action.type === ACTION_SET_RUNTIME_ERROR)
      .mergeMap((action) =>
        ajax({
          url: `${store.getState().runtime.variables.serverOrigin}${PATH_API_REPORT_ERROR}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            error: action.payload
          },
          withCredentials: true
        }).map(() => ({
          type: ACTION_SET_RUNTIME_ERROR_FULFILLED
        }))
      );
  };
