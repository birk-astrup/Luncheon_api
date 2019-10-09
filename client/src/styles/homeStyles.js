import {StyleSheet} from 'react-native';
import style from './main.js';

export default StyleSheet.create({
  box: {
    height: 90,
    width: 90,
    borderRadius: 5,
    backgroundColor: '#E46053',
    left: '50%',
    transform: [{translateX: -45}],
  },
  checkmark: {
    height: 45,
    width: 45,
    left: '50%',
    transform: [{translateX: -22.5}],
  },
  container: {
    ...style.background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    paddingLeft: 65,
    paddingRight: 65,
  },
  redHeaderText: {
    ...style.largeHeaderText,
    ...style.redText,
  },
  greenHeaderText: {
    ...style.largeHeaderText,
    ...style.greenText,
  },
  wrapper: {
    position: 'relative',
    height: 375,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
