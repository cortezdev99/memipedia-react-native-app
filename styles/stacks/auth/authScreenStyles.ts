import { StyleSheet } from 'react-native';
import Constants from "expo-constants"
import { dark } from '../../colors';

export default StyleSheet.create({
  container: {
    backgroundColor: dark,
    padding: 15,
    height: "100%",
    paddingTop: Constants.statusBarHeight
  }
})