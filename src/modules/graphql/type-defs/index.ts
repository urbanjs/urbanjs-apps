import types from './_types';
import job from './job';
import user from './user';
import queries from './queries';
import mutations from './mutations';

export const typeDefs = `
${types}
${job}
${user}

${queries}
${mutations}
`;
