import React, {useEffect} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ({navigation}) => {
  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    navigation.navigate(userToken ? 'App' : 'Auth');
  };

  useEffect(() => {
    _bootstrapAsync();
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
