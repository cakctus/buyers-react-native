import { useState } from "react"
import {
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native"
import Signin from "./Signin/Signin"
import Signup from "./Signup/Signup"
import ResetPass from "./ResetPass/ResetPass"
import { useAppSelector } from "../../redux/store"

const Auth = () => {
  const authSlice = useAppSelector((state) => state.authSlice)

  return (
    <>
      <View style={{ flex: 1 }}>
        {Platform.OS === "android" ? (
          <View style={{ flex: 1 }}>
            <StatusBar />
            <Signup />
          </View>
        ) : (
          <SafeAreaView>
            <Signup />
          </SafeAreaView>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
})

export default Auth
