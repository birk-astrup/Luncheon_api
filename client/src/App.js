import React from 'react';
import AppNavigator from './navigators/AppNavigator';
import {LunsjProvider} from './store';

export default App = () => (
  <LunsjProvider>
    <AppNavigator/>
  </LunsjProvider>
);
