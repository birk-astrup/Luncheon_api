import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AppStack from './App';
import AuthStack from './Auth';

const AppNavigator = {
  App: AppStack,
  Auth: AuthStack,
};

export default createAppContainer(
  createSwitchNavigator(AppNavigator, {initialRouteName: 'Auth'}),
);
