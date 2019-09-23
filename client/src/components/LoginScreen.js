import React from 'react';
import {View, Button, AsyncStorage, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ({navigation}) => {
  const _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    navigation.navigate('App');
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in!" onPress={_signInAsync} />
    </View>
  );
};
