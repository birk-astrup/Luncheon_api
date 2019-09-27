import React from 'react';
import {Provider} from './store';
import AppNavigator from './navigators';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id,
});

const client = new ApolloClient({
  cache,
});

export default () => (
  <Provider>
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  </Provider>
);
