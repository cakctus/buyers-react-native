import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Logout from "./Logout/Logout"

const Home = () => {
  return (
    <View style={styles.touchble}>
      <Text>Welcome</Text>
      <Logout />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
  },
  touchble: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
})

export default Home
