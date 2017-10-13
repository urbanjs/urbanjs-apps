import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { ACTION_APOLLO_MUTATION_ERROR, ACTION_APOLLO_QUERY_ERROR } from '../../constants';
import { setRuntimeError } from '../actions/runtime';

export type ApolloErrorAction = Action & { error: { message: string, stack: string } };

export const graphql = () => (action$: ActionsObservable<ApolloErrorAction>) => {
  return action$
    .filter((action) => action.type === ACTION_APOLLO_MUTATION_ERROR || action.type === ACTION_APOLLO_QUERY_ERROR)
    .map((action) => setRuntimeError(action.error));
};
