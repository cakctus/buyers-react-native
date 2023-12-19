import React, { useState, useRef, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import ZodValidationService from "../../../Services/Validation/ZodValidation"
import Logo from "../../../Images/Logo"

type Navigation = {
  navigate: (screen: "Signup") => void
}

const Signin = () => {
  const [email, setEmail] = useState("")
  const [validationError, setValidationError] = useState("")
  const textInputRef = useRef<any | TextInput>(null)

  const navigation = useNavigation<Navigation>()

  useEffect(() => {
    setValidationError("")
  }, [])

  const handleSignin = () => {
    const { isValid, validationError } =
      ZodValidationService.validationSignin(email)

    if (isValid) {
      setEmail("")
      setValidationError("")
      navigation.navigate("Signup")
    } else {
      // Form validation failed, set the validation error
      setValidationError(validationError)
    }
  }

  const dismissKeyboard = () => {
    // Dismiss the keyboard when clicking outside the TextInput
    textInputRef.current.blur()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.touchble}>
      <View style={styles.logo}>
        <Logo />
      </View>

        <View style={styles.form}> 
        <Text>Signin</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          ref={textInputRef}
        />
        {validationError !== "" && (
          <Text style={styles.error}>{validationError}</Text>
        )}
        <Button onPress={handleSignin} title="Signin" color="#19929f" />
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text>Already have an account? Signup</Text>
        </TouchableHighlight></View>
       
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "silver",
    padding: 10,
    borderRadius: 6,
  },
  error: {
    color: "red",
  },
  touchble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f6f6f9 ",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    margin: 0,
    marginBottom: 36,
    width: "90%",
    boxShadow: "0 20px 40px rgba(0,0,0,.2)",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
  },
  loginTitle: {
    textAlign: "center",
    fontWeight: "600",
  },
  loginRegister: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 35,
  },
  forgotPassword: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 10,
  },
  signup: {
    backgroundColor: "#19929f",
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
  },
  signupText: {
    color: "white",
  },
})

export default Signin
