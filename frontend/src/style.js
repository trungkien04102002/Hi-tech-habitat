import { StyleSheet } from "react-native";

export default StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 2,
        height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,

    elevation: 7,
  },

  innerShadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 2,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 20,
  }
})