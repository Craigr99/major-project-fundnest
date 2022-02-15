import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import Welcome from "../screens/auth/Welcome";
import BanksList from "../screens/BanksList";
import UserAgreement from "../screens/UserAgreement";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import Home from "../screens/Home";
import ListAccounts from "../screens/auth/ListAccounts";

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={Welcome}
          // options={{ title: "Welcome" }}
        />
        <Stack.Screen
          // options={{ headerShown: false }}
          name="Register"
          component={Register}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          // options={{ headerShown: false }}
          name="Login"
          component={Login}
          options={{ title: "Sign In" }}
        />
        <Stack.Screen
          name="BanksList"
          component={BanksList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserAgreement"
          component={UserAgreement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListAccounts"
          component={ListAccounts}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Routes;
