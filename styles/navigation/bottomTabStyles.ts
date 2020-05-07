import { StyleSheet } from 'react-native';
import { dark } from '../colors'

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
    width: "100%",
    height: 80,
    backgroundColor: dark,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
})

export default styles