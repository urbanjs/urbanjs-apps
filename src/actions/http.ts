import { ACTION_SEND_HTTP_REQUEST, ACTION_RECEIVE_HTTP_RESPONSES } from '../constants';

export type SendHttpRequestsPayload = {
  requests: Request[]
};

export function sendHttpRequests({requests}: SendHttpRequestsPayload) {
  return {
    type: ACTION_SEND_HTTP_REQUEST,
    payload: {
      requests
    }
  };
}

export type ReceiveHttpResponsesPayload = {
  responses: Response[]
};

export function receiveHttpResponses({responses}: ReceiveHttpResponsesPayload) {
  return {
    type: ACTION_RECEIVE_HTTP_RESPONSES,
    payload: {
      responses
    }
  };
}
