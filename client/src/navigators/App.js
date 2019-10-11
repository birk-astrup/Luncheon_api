import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import navConfig from '../config/navigation';

import Home from '../containers/Home';
import QRscanner from '../components/QRscanner';

import Stats from '../containers/Stats';
import Calendar from '../containers/Calendar';

const handlePress = ({navigation}) => {
  navigation.popToTop();
  navigation.navigate(navigation.state.routeName);
};

// Home Screen, that handles QR scanner and message
const HomeStack = createStackNavigator(
  {
    Home: {screen: Home},
    QRscanner: {screen: QRscanner},
  },
  {
    initialRouteName: 'Home',
    headerMode: {header: null},
  },
);

// Main routes for the bottomTabNavigator
const routes = {
  Calendar: {
    screen: Calendar,
  },
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: 'Home',
      tabBarOnPress: handlePress,
    },
  },
  Stats: {
    screen: Stats,
  },
};

const navigator = createBottomTabNavigator(routes, navConfig);
export default navigator;