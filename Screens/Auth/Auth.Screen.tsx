// libraries
import { Platform, SafeAreaView, StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// components
import Auth from "../../components/Auth/Auth"
import Signup from "../../components/Auth/Signup/Signup"
import Signin from "../../components/Auth/Signin/Signin"
import ResetPass from "../../components/Auth/ResetPass/ResetPass"
import Home from "../../components/Auth/Home"

const Stack = createNativeStackNavigator()

function AuthScreen() {
  const apps = [Auth, Signin, Signup, ResetPass, Home]
  const appsNames = apps.map((app) => app.name)

  return (
    <>
      {Platform.OS === "android" ? (
        <>
          <StatusBar />
          {/* <NavigationContainer> */}
          <Stack.Navigator>
            {apps.map((app, index) => (
              <Stack.Screen
                key={index}
                name={appsNames[index]}
                component={app}
                options={{ headerShown: false }}
              />
            ))}
          </Stack.Navigator>
          {/* </NavigationContainer> */}
        </>
      ) : (
        <SafeAreaView>
          {/* <NavigationContainer> */}
          <Stack.Navigator>
            {apps.map((app, index) => (
              <Stack.Screen
                key={index}
                name={appsNames[index]}
                component={app}
                options={{ headerShown: false }}
              />
            ))}
          </Stack.Navigator>
          {/* </NavigationContainer> */}
        </SafeAreaView>
      )}
    </>
  )
}

export default AuthScreen
