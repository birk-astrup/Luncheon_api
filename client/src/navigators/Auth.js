import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../components/LoginScreen';

export default createStackNavigator(
  {Login: LoginScreen},
  {headerMode: {header: null}},
);
