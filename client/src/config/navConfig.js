import React from 'react';
import Icons from 'react-native-vector-icons/Feather';

export default {
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: () => {
      const {routeName} = navigation.state;
      let IconComponent = Icons;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home';
      } else if (routeName === 'Stats') {
        iconName = 'pie-chart';
      } else if (routeName === 'Calendar') {
        iconName = 'calendar';
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={45} />;
    },
  }),
  tabBarOptions: {
    style: {
      height: 70,
      backgroundColor: '#CACACA',
    },
    showLabel: false,
  },
  initialRouteName: 'Home',
};
