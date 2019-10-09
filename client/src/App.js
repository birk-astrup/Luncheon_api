import React from 'react';
import Store from './store';
import AppNavigator from './navigators';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import SInfo from 'react-native-sensitive-info';

const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id,
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
  request: async op => {
    const access = await SInfo.getItem('accessToken', {});

    console.log('access', access);
    op.setContext(context => ({
      headers: {
        ...context.headers,
        Authorization: access ? `Bearer ${access}` : '',
      },
    }));
  },
});

export default () => (
  <Store.Provider>
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  </Store.Provider>
);
