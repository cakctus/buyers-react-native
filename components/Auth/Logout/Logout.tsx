import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import StorageService from "../../../Services/Storage/Storage.Service"

type Navigation = {
  navigate: (screen: "Signup") => void
}

const Logout = () => {
  const navigation: Navigation = useNavigation()

  const handleLogout = async () => {
    const removeLoginState = await StorageService.remove("auth")
    const removeToken = await StorageService.remove("token")

    if (removeLoginState && removeToken) {
      navigation.navigate("Signup")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logout</Text>
      <Button title="Logout" color="#19929f" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
})

export default Logout
