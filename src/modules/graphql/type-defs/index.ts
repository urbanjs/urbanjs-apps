import types from './_types';
import user from './user';
import queries from './queries';
import mutations from './mutations';

export const typeDefs = `
${types}
${user}

${queries}
${mutations}
`;
