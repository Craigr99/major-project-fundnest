import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./features/auth";

// SCREENS
import Welcome from "./pages/Welcome";
import BanksList from "./pages/BanksList";
import UserAgreement from "./pages/UserAgreement";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Welcome}
            // options={{ title: "Welcome" }}
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
          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
