import React from 'react';
import AppNavigator from './navigators';
import {Provider} from './store';

export default () => (
  <Provider>
    <AppNavigator />
  </Provider>
);
