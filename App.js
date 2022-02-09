import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

// Redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./features/auth";
import userReducer from "./features/user";

// SCREENS
import Welcome from "./screens/auth/Welcome";
import BanksList from "./screens/BanksList";
import UserAgreement from "./screens/UserAgreement";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
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
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate("Profile", { name: "Jane" })}
    />
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};
