import {ApolloClient, createNetworkInterface} from 'react-apollo';

export function createApolloClient({uri}: { uri: string }) {
  const networkInterface = createNetworkInterface({uri});

  return new ApolloClient({
    networkInterface: networkInterface
  });
}
