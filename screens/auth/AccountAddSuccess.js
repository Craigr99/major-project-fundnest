import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Pressable,
  Text,
  View,
} from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const AccountAddSuccess = ({ navigation, route }) => {
  const bankName = useSelector((state) => state.bank.value);
  const [accounts, setAccounts] = useState([]);
  const { nordigenToken } = useSelector((state) => state.auth.nordigenToken);
  const userAccountID = useSelector((state) => state.user.accountID.accountID);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    console.log("getting accs");
    console.log(userAccountID);
    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/${route.params.accountID}/details/`,
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then((res) => {
        setAccounts(res.data.account);
        console.log(accounts);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView>
      <Heading alignSelf="center" fontSize="3xl" mb="5">
        You have linked the following accounts:
      </Heading>
      {accounts ? (
        <Pressable>
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
                  maxW="90%"
                >
                  {bankName} - {accounts.name}
                </Text>
                {/* <Text
                  color="coolGray.500"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  {accounts.name}
                </Text> */}
                <Text fontSize="xl" fontWeight={600}>
                  {accounts.ownerName}
                </Text>
              </View>
              <Ionicons
                name="checkmark-circle-outline"
                size={32}
                color="#16a34a"
              />
            </Flex>
            <Text mt="3">Currency: {accounts.currency}</Text>
            <Text>Product: {accounts.product}</Text>
          </Box>
        </Pressable>
      ) : (
        <></>
      )}

      <Box mt={8} mx={10}>
        <Text fontSize="lg" fontWeight={500}>
          Would you like to link another account?
        </Text>

        <Flex direction="row" mt={6}>
          <Button
            bg="blue.500"
            flex={1}
            leftIcon={
              <Icon as={Ionicons} name="add-circle-outline" size="sm" />
            }
            onPress={() => {
              navigation.navigate("BanksList");
            }}
          >
            Account
          </Button>
          <Button
            flex={1}
            variant="link"
            colorScheme="info"
            onPress={() => {
              navigation.navigate("TabScreens");
            }}
          >
            Continue
          </Button>
        </Flex>
      </Box>
    </SafeAreaView>
  );
};

export default AccountAddSuccess;
