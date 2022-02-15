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
  Progress,
  HStack,
  Spacer,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

const Home = ({ navigation, route }) => {
  const testarray = [1, 2, 3];
  // State
  const user = useSelector((state) => state.user.value);
  const nordigenToken = useSelector((state) => state.auth.nordigenToken);
  const authToken = useSelector((state) => state.auth.authToken);
  const [accountBalance, setAccountBalance] = useState("");

  // get account balance
  // useState(() => {
  //   axios
  //     .get(
  //       `https://ob.nordigen.com/api/v2/accounts/${route.params.accountID}/balances/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${nordigenToken.nordigenToken}`,
  //         },
  //       }
  //     )
  //     .then((res) => setAccountBalance(res.data.balances[0]))
  //     .catch((err) => console.log(err));
  // });

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
              <Text fontSize="3xl" color="white" fontWeight={600}>
                {user.name || "John Doe"}
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
        {/* <Button size="lg" mb="4" bg="blue.500" py="3" onPress={logoutUser}>
          Logout
        </Button> */}
        {accountBalance ? (
          <Text color="white">
            Balance available : €{accountBalance.balanceAmount.amount}
          </Text>
        ) : (
          <Text></Text>
        )}
        {/* Instant Cash Card */}
        <Box
          mx="5"
          mt="12"
          px="6"
          py="8"
          bg="white"
          borderRadius="xl"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex>
            <Text fontSize="lg" fontWeight={600}>
              Instant
            </Text>
            <Text color="coolGray.500">Cash Available</Text>
          </Flex>
          <Text fontWeight={700} fontSize="xl">
            €429.00
          </Text>
        </Box>

        {/* Savings Card */}
        <Box
          mx="5"
          mt="8"
          px="6"
          py="8"
          bg="white"
          borderRadius="xl"
          shadow="2"
        >
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Text fontSize="lg" fontWeight={600}>
                Savings
              </Text>
              <Text color="coolGray.500">In your savings</Text>
            </Box>
            <Text fontWeight={700} fontSize="xl">
              €1,292.00
            </Text>
          </Flex>
          <Flex mt="4" direction="row" flexWrap="wrap" justify="space-between">
            {testarray.map((item, index) => (
              <Box
                key={index}
                borderColor="coolGray.200"
                borderWidth={1}
                p="3"
                w="48%"
                mb={4}
              >
                <FontAwesome name="plane" size={30} color="#4584FF" />
                <Text fontWeight={600} fontSize="md" my="3">
                  €250.00/
                  <Text fontWeight={200} fontSize="sm" color="coolGray.500">
                    €350.00
                  </Text>
                </Text>
                <Progress colorScheme="emerald" value={55} mb="5" />
              </Box>
            ))}
            {/* Add button */}
            <Box alignSelf="center" alignItems="center" w="48%">
              <Text>btn</Text>
            </Box>
          </Flex>
        </Box>
      </SafeAreaView>
    </View>
  );
};

export default Home;
