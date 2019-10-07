import React from 'react';
import UserHandler from './store';
import AppNavigator from './navigators';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import SInfo from 'react-native-sensitive-info';

import {REACT_APP_DEVELOPMENT} from 'react-native-dotenv';

const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id,
});

const client = new ApolloClient({
  uri: REACT_APP_DEVELOPMENT,
  cache,
  request: async op => {
    const token = await SInfo.getItem('accessToken', {});
    op.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }));
  },
});

export default () => (
  <UserHandler.Provider>
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  </UserHandler.Provider>
);
