import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  Box,
  Heading,
  Pressable,
  Center,
  Skeleton,
  VStack,
  Flex,
  View,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getUserAccount } from "../../features/user";

const ListAccounts = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [accountOne, setAccountOne] = useState({});
  const [accountTwo, setAccountTwo] = useState({});
  const [accountThree, setAccountThree] = useState({});
  const [accountIds, setAccountIds] = useState([]);
  const { nordigenToken } = useSelector((state) => state.auth.nordigenToken);
  const { authToken } = useSelector((state) => state.auth.authToken);

  // Get account details
  useEffect(() => {
    getAccounts();
    // route.params.accounts.forEach((accountId) => {
    //   setAccounts(accountId);
    //   console.log("here", accounts);
    // });
    // route.params.accounts.map((accountID) => {
    //   const updatedAccounts = [...accounts, accountID];
    //   setAccounts(updatedAccounts);
    //   console.log("here", accounts);
    // });
    // axios
    //   .get(
    //     `https://ob.nordigen.com/api/v2/accounts/${route.params.accounts[0]}/details/`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${nordigenToken}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setAccount(res.data.account);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const getAccounts = () => {
    // account IDs from previous route
    setAccountIds(route.params.accounts);

    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/${accountIds[0]}/details/`,
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then((res) => {
        setAccountOne(res.data.account);
        console.log(accountOne);
      })
      .catch((err) => console.log(err));

    // get 2nd account
    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/${accountIds[1]}/details/`,
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then((res) => {
        setAccountTwo(res.data.account);
        console.log(accountTwo);
      })
      .catch((err) => console.log(err));
  };

  const selectAccount = (accountNumber) => {
    axios
      .post(
        "http://localhost:8000/accounts/",
        {
          account_id: accountIds[accountNumber],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log("resdata", res.data.accounts[0].account_id);
        dispatch(
          getUserAccount({ accountID: res.data.accounts[0].account_id })
        );

        // navigate to home screen with the account ID passed
        navigation.navigate("TabScreens", {
          accountID: res.data.accounts[0].account_id,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView>
      <Heading alignSelf="center" fontSize="3xl" mb="5">
        Select account
      </Heading>
      {accountOne ? (
        <Pressable onPress={() => selectAccount(0)}>
          <Box
            mx="8"
            borderWidth="1"
            borderColor="coolGray.300"
            rounded="xl"
            px="6"
            py="4"
            bg="white"
          >
            <Flex direction="row" alignItems="center" justify="space-between">
              <View>
                <Text
                  color="coolGray.500"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  {accountOne.name}
                </Text>
                <Text fontSize="xl" fontWeight={600}>
                  {accountOne.ownerName}
                </Text>
              </View>
              <Ionicons name="enter-outline" size={24} />
            </Flex>
            <Text mt="3">Currency: {accountOne.currency}</Text>
            <Text>Product: {accountOne.product}</Text>
          </Box>
        </Pressable>
      ) : (
        <Center w="100%">
          <VStack
            w="100%"
            maxW="400"
            borderWidth="2"
            space={8}
            overflow="hidden"
            rounded="md"
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <Skeleton.Text px="6" py="8" lines={3} startColor="coolGray.300" />
          </VStack>
        </Center>
      )}

      {accountTwo ? (
        <Pressable onPress={() => selectAccount(1)}>
          <Box
            mx="8"
            mt={4}
            borderWidth="1"
            borderColor="coolGray.300"
            rounded="xl"
            px="6"
            py="4"
            bg="white"
          >
            <Flex direction="row" alignItems="center" justify="space-between">
              <View>
                <Text
                  color="coolGray.500"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  {accountTwo.name}
                </Text>
                <Text fontSize="xl" fontWeight={600}>
                  {accountTwo.ownerName}
                </Text>
              </View>
              <Ionicons name="enter-outline" size={24} />
            </Flex>
            <Text mt="3">Currency: {accountTwo.currency}</Text>
            <Text>Product: {accountTwo.product}</Text>
          </Box>
        </Pressable>
      ) : (
        <Center w="100%">
          <VStack
            w="100%"
            maxW="400"
            borderWidth="2"
            space={8}
            overflow="hidden"
            rounded="md"
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <Skeleton.Text px="6" py="8" lines={3} startColor="coolGray.300" />
          </VStack>
        </Center>
      )}
      {/* {accounts ? (
        <Pressable onPress={selectAccount}>
          <Box
            mx="8"
            borderWidth="1"
            borderColor="coolGray.300"
            rounded="xl"
            px="6"
            py="4"
            bg="white"
          >
            <Flex direction="row" alignItems="center" justify="space-between">
              <View>
                <Text
                  color="coolGray.500"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  {account.name}
                </Text>
                <Text fontSize="xl" fontWeight={600}>
                  {account.ownerName}
                </Text>
              </View>
              <Ionicons name="enter-outline" size={24} />
            </Flex>
            <Text mt="3">Currency: {account.currency}</Text>
            <Text>Product: {account.product}</Text>
          </Box>
        </Pressable>
      ) : (
        <Center w="100%">
          <VStack
            w="100%"
            maxW="400"
            borderWidth="2"
            space={8}
            overflow="hidden"
            rounded="md"
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <Skeleton.Text px="6" py="8" lines={3} startColor="coolGray.300" />
          </VStack>
        </Center>
      )} */}
    </SafeAreaView>
  );
};

export default ListAccounts;
