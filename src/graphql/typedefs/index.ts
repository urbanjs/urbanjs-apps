import types from './_types';
import job from './job';
import user from './user';

export const typeDefs = `
${types}
${job}
${user}

type Query {
  user: User
}
`;
