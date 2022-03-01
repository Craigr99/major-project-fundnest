import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import Welcome from "../screens/auth/Welcome";
import BanksList from "../screens/BanksList";
import UserAgreement from "../screens/UserAgreement";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import UserIndex from "../screens/user/Index";
import TransactionsIndex from "../screens/transactions/Index";
import ListAccounts from "../screens/auth/ListAccounts";
import SavingsIndex from "../screens/savings/Index";
import SavingsCreate from "../screens/savings/Create";
import SavingsShow from "../screens/savings/Show";
import BillsIndex from "../screens/bills/Index";
import AddItemIndex from "../screens/AddItemIndex";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  const TabScreens = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "UserIndex") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "TransactionsIndex") {
            iconName = focused ? "receipt-outline" : "receipt-outline";
          } else if (route.name === "SavingsIndex") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "AddItemIndex") {
            iconName = focused ? "add-outline" : "add-outline";
          } else if (route.name === "BillsIndex") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={route.name === "AddItemIndex" ? 48 : 26}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#4584FF",
        tabBarInactiveTintColor: "#6F6F6F",
        tabBarStyle: { height: 90 },
      })}
    >
      <Tab.Screen
        name="UserIndex"
        component={UserIndex}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 13 },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="SavingsIndex"
        component={SavingsIndex}
        options={{
          tabBarLabel: "Savings",
          headerTitle: "",
          headerStyle: {
            height: 47,
            backgroundColor: "#27272a",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
      <Tab.Screen
        name="AddItemIndex"
        component={AddItemIndex}
        options={{
          headerShown: false,
          tabBarLabelStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="BillsIndex"
        component={BillsIndex}
        options={{
          tabBarLabel: "Bills",
          tabBarLabelStyle: { fontSize: 13 },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TransactionsIndex"
        component={TransactionsIndex}
        options={{
          tabBarLabel: "Recent",
          tabBarLabelStyle: { fontSize: 13 },
          // headerShown: false,
          headerTitle: "",
          headerStyle: {
            height: 47,
            backgroundColor: "#27272a",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
    </Tab.Navigator>
  );

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={Welcome}
          // options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="TabScreens"
          component={TabScreens}
          options={{ headerShown: false }}
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

        <Stack.Screen name="BanksList" component={BanksList} />
        <Stack.Screen
          name="UserAgreement"
          component={UserAgreement}
          options={{ title: "User Agreement" }}
        />
        <Stack.Screen
          name="ListAccounts"
          component={ListAccounts}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SavingsCreate" component={SavingsCreate} />
        <Stack.Screen name="SavingsShow" component={SavingsShow} />
      </Stack.Navigator>
    </>
  );
};

export default Routes;
