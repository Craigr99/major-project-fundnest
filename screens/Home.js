import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HamburgerIcon,
  Link,
  Text,
  View,
} from "native-base";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const nordigenToken = useSelector((state) => state.auth.nordigenToken);
  const authToken = useSelector((state) => state.auth.authToken);

  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken.authToken}`,
          },
        }
      )
      .then((res) => {
        navigation.navigate("Welcome");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View bg="dark.100" h="1/2" w="full" borderBottomRadius="36">
      <SafeAreaView>
        <Box mx="8" pt="10">
          <Flex direction="row" alignItems="center">
            <Avatar
              bg="purple.600"
              alignSelf="center"
              size="xl"
              source={{
                uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
              }}
            >
              RB
            </Avatar>
            <Flex ml="6" direction="column">
              <Text fontSize="lg" color="amber.400">
                Welcome back,
              </Text>
              <Text fontSize="3xl" color="white" fontWeight="bold">
                {user.name}
              </Text>
            </Flex>

            <HamburgerIcon
              size={5}
              color="amber.400"
              ml="auto"
              alignSelf="flex-start"
            />
          </Flex>
        </Box>
        <Button size="lg" mb="4" bg="blue.500" py="3" onPress={logoutUser}>
          Logout
        </Button>
      </SafeAreaView>
    </View>
  );
};

export default Home;
