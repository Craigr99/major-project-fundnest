import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import Welcome from "../screens/auth/Welcome";
import BanksList from "../screens/BanksList";
import UserAgreement from "../screens/UserAgreement";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import Home from "../screens/Home";
import ListAccounts from "../screens/auth/ListAccounts";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RecentTransactions from "../screens/auth/RecentTransactions";

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  const TabScreens = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "RecentTransactions") {
            iconName = focused ? "receipt-outline" : "receipt-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: "#4584FF",
        tabBarInactiveTintColor: "#6F6F6F",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: { fontSize: 13 },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="RecentTransactions"
        component={RecentTransactions}
        options={{
          tabBarLabel: "Transactions",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="TabScreens"
          component={TabScreens}
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
