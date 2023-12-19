import { useState, useRef, useEffect } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import ZodValidationService from "../../../Services/Validation/ZodValidation"
import StorageService from "../../../Services/Storage/Storage.Service"
import { useLoginMutation } from "../../../redux/api/Auth/auth"
import Logo from "../../../Images/Logo"
// import { useAppDispatch } from "../../../redux/store"
// import { login } from "../../../redux/features/Auth/authSlice"

type Navigation = {
  navigate: (screen: "Signin" | "ResetPass" | "Home") => void
}

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  })
  const [signupError, setSignupError] = useState({
    message: ""
  })

  const emailInputRef = useRef<any | TextInput>(null)
  const passwordInputRef = useRef<any | TextInput>(null)

  const navigation = useNavigation<Navigation>()

  const [authPost,  {isSuccess, isError}] = useLoginMutation()

  // const dispatch = useAppDispatch()

  useEffect(() => {
    setValidationErrors({
      email: "",
      password: "",
    })

    setSignupError({
      message: ""
    })
  }, [])

  useEffect(() => {
    if (isSuccess) {
      console.log('Mutation was successful!');
    }
    if (isError) {
      console.error('Mutation encountered an error:', isError);
    }
  }, [isSuccess, isError]);



  const handleLogin = async () => {
    const { isValid, validationErrors } = ZodValidationService.validateLogin(
      email,
      password
    )
    if (isValid) {
      // Clear any previous validation errors
      setEmail("")
      setPassword("")
      setValidationErrors({ email: "", password: "" })
      try {
        const response = await authPost({ username: email, password: password }).unwrap()
        const [authSettled, tokenSettled] = await Promise.allSettled([
          StorageService.set("auth", "isAuthenticated"),
          StorageService.set("token", response.token)
        ]);
        const promises = [authSettled, tokenSettled]

        promises.map((promise) =>  {
          promise.status === "fulfilled" &&  navigation.navigate("Home")
        })
      

      } catch (error: any) {
        if (error.data && error.data.code === 401) {
          setSignupError({ message: error.data.message });
        }

      }
    } else {
      // Form validation failed, set the validation errors
      setValidationErrors(validationErrors)
    }
  }

  const dismissKeyboard = () => {
    // Dismiss the keyboard when clicking outside the TextInput
    emailInputRef.current.blur()
    passwordInputRef.current.blur()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.touchble}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.form}>
          <Text style={styles.loginTitle}>Login to the system</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            ref={emailInputRef}
          />
          {validationErrors.email && (
            <Text style={styles.error}>{validationErrors.email}</Text>
          )}
          {signupError.message && (
             <Text style={styles.error}>{signupError.message}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            ref={passwordInputRef}
          />
          {validationErrors.password && (
            <Text style={styles.error}>{validationErrors.password}</Text>
          )}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.signup}
            accessibilityLabel="Learn more about this purple button"
          >
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
          <TouchableHighlight
            underlayColor={"transparent"}
            onPress={() => navigation.navigate("Signin")}
          >
            <Text style={styles.loginRegister}>New user? Registration</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"transparent"}
            onPress={() => navigation.navigate("ResetPass")}
          >
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
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

export default Signup
