import {Alert} from 'react-native';

const sendMutation = () => {};

export default day =>
  Alert.alert(
    'Add Timestamp',
    `Do you want to add a timestamp for ${day.dateString}?`,
    [
      {
        text: 'NO',
        onPress: () => console.log('Closed Dialog'),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => sendMutation},
    ],
    {cancelable: false},
  );
