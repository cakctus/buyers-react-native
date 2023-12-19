import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import ZodValidationService from "../../../Services/Validation/ZodValidation"
import Logo from "../../../Images/Logo"

type Navigation = {
  navigate: (screen: "Signin" | "Singup") => void
}

const ResetPass = () => {
  const [email, setEmail] = useState("")
  const [validationError, setValidationError] = useState("")

  const emailInputRef = useRef<any | TextInput>()

  const navigation: Navigation = useNavigation()

  useEffect(() => {
    setValidationError("")
  }, [])

  const handleResetPassword = () => {
    const { isValid, validationError } =
      ZodValidationService.validationResetPass(email)

    if (isValid) {
      setEmail("")
      setValidationError("")
      navigation.navigate("Singup")
    } else {
      // Form validation failed, set the validation error
      setValidationError(validationError)
    }
  }

  const dismissKeyboard = () => {
    // Dismiss the keyboard when clicking outside the TextInput
    emailInputRef.current.blur()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.touchble}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.form}>
      <Text>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          ref={emailInputRef}
        />
        {validationError !== "" && (
          <Text style={{ color: "red" }}>{validationError}</Text>
        )}
        <Button
          color={"#19929f"}
          title="Reset Password"
          onPress={handleResetPassword}
        />

        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text>Already have an account? Sign in</Text>
        </TouchableHighlight>
      </View>
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

export default ResetPass
