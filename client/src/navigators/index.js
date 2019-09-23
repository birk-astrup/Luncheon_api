import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AppStack from './App';
import AuthStack from './Auth';
import AuthLoadingScreen from '../components/AuthLoading';

const AppNavigator = {
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
};

export default createAppContainer(
  createSwitchNavigator(AppNavigator, {initialRouteName: 'AuthLoading'}),
);
