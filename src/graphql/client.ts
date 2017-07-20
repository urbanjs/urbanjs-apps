import {ApolloClient, createNetworkInterface} from 'react-apollo';

export type ApolloClientConfig = {
  uri: string;
  devMode: boolean;
};

export function createApolloClient({uri, devMode}: ApolloClientConfig) {
  const networkInterface = createNetworkInterface({uri});

  return new ApolloClient({
    networkInterface: networkInterface,
    connectToDevTools: devMode
  });
}
