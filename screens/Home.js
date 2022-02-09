import {
  Avatar,
  Box,
  Container,
  Flex,
  HamburgerIcon,
  Text,
  View,
} from "native-base";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.value);

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
                {/* {user.name} */}
              </Text>
              <Text fontSize="3xl" color="white" fontWeight="bold">
                John Doe
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
      </SafeAreaView>
    </View>
  );
};

export default Home;
