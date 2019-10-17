import React from 'react';
import {Compose} from 'unstated-next-compose';
import SInfo from 'react-native-sensitive-info';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient, {InMemoryCache} from 'apollo-boost';

import AppNavigator from './navigators';
import {calendarContainer, userContainer} from './store';

const store = [calendarContainer.Provider, userContainer.Provider];
const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id,
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
  request: async op => {
    const access = await SInfo.getItem('accessToken', {});
    op.setContext(context => ({
      headers: {
        ...context.headers,
        Authorization: access ? `Bearer ${access}` : '',
      },
    }));
  },
});

export default () => (
  <Compose providers={store}>
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  </Compose>
);
