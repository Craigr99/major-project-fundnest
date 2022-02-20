import { NavigationContainer } from "@react-navigation/native";

// Redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./features/auth";
import userReducer from "./features/user";

// components
import Routes from "./routes/Routes";
import CustomThemeContainer from "./components/CustomThemeContainer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default function App() {
  return (
    <CustomThemeContainer>
      <Provider store={store}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </Provider>
    </CustomThemeContainer>
  );
}

// const HomeScreen = ({ navigation }) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() => navigation.navigate("Profile", { name: "Jane" })}
//     />
//   );
// };
// const ProfileScreen = ({ navigation, route }) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };
