import {
  ACTION_SEND_HTTP_REQUEST,
  ACTION_RECEIVE_HTTP_RESPONSES
} from '../../constants';
import {
  SendHttpRequestsPayload,
  ReceiveHttpResponsesPayload
} from '../actions';

export type LoaderState = {
  isLoading: boolean;
  pendingHttpRequestCount: number;
};

export type LoaderAction = {
  type: string;
  payload: object;
};

export function loader(state: LoaderState = {isLoading: false, pendingHttpRequestCount: 0},
                       action: LoaderAction) {
  switch (action.type) {
    case ACTION_SEND_HTTP_REQUEST:
      const newHttpRequests = (<SendHttpRequestsPayload> action.payload).requests;

      return {
        ...state,
        isLoading: true,
        pendingHttpRequestCount: state.pendingHttpRequestCount + newHttpRequests.length
      };
    case ACTION_RECEIVE_HTTP_RESPONSES:
      const newHttpResponses = (action.payload as ReceiveHttpResponsesPayload).responses;
      const pendingHttpRequestCount = state.pendingHttpRequestCount - newHttpResponses.length;

      return {
        ...state,
        isLoading: pendingHttpRequestCount < 0,
        pendingHttpRequestCount
      };
    default:
      return state;
  }
}
