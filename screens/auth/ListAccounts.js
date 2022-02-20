import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  Text,
  Box,
  Heading,
  Pressable,
  Center,
  Skeleton,
  VStack,
} from "native-base";

const ListAccounts = ({ navigation, route }) => {
  const [account, setAccount] = useState({});
  const { nordigenToken } = useSelector((state) => state.auth.nordigenToken);
  const { authToken } = useSelector((state) => state.auth.authToken);

  // Get account details
  useEffect(() => {
    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/${route.params.accounts[0]}/details/`,
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then((res) => {
        setAccount(res.data.account);
      })
      .catch((err) => console.log(err));
  });

  const selectAccount = () => {
    axios
      .post(
        "http://localhost:8000/accounts/",
        {
          account_id: route.params.accounts[0],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
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
      {account ? (
        // TODO : on press the ID of the account picked should
        // be stored in the database as the users account
        // as this ID is used to reference and get access to the account's transactions.
        <Pressable onPress={selectAccount}>
          <Box
            mx="8"
            borderWidth="1"
            borderColor="coolGray.300"
            rounded="xl"
            px="6"
            py="4"
          >
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
      )}
    </SafeAreaView>
  );
};

export default ListAccounts;
