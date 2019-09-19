import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import routes from '../config/routes';
import navConfig from '../config/navConfig';

const bottomNavigation = createBottomTabNavigator(routes, navConfig)

export default createAppContainer(bottomNavigation);
