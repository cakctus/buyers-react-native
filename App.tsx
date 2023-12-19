// libraries
import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// components
import AuthScreen from "./Screens/Auth/Auth.Screen"
import HomeScreen from "./Screens/Home/Home.Screen"
// services
import AuthService from "./Services/Auth/Auth.Service"
// redux
import { Provider } from "react-redux"
import store from "./redux/store"
import SplashScreen from "./components/Splash/SplashScreen"

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    
    AuthService.isAuth(setIsAuth)
  }, [isAuth])

  if (isAuth === false) {
    // While authentication status is being determined, show a loading screen or a splash screen
    return (
      <Provider store={store}>
        <NavigationContainer>
          <SplashScreen />
        </NavigationContainer>
      </Provider>
    )
  } else if (isAuth) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>
    )
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AuthScreen />
        </NavigationContainer>
      </Provider>
    )
  }
}
