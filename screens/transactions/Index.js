import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Badge, Box, Flex, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";

const Index = ({ navigation }) => {
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [accountBalance, setAccountBalance] = useState("");
  const userAccountID = useSelector((state) => state.user.accountID.accountID);
  const nordigenToken = useSelector(
    (state) => state.auth.nordigenToken.nordigenToken
  );

  useEffect(() => {
    // get account transactions
    getTransactions();
    getAccountBalance();
  }, [userAccountID]);

  const getTransactions = () => {
    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/${userAccountID}/transactions/`,
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.transactions.booked.slice(0, 5));
        setAccountTransactions(res.data.transactions.booked.slice(0, 14));
      })
      .catch((err) => console.log(err));
  };

  const getAccountBalance = () => {
    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/${userAccountID}/balances/`,
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.balances[0]);
        setAccountBalance(res.data.balances[0]);
      })
      .catch((err) => console.log(err));
  };

  const TransactionIcon = ({ color, direction }) => {
    return (
      <Box
        w="12"
        h="12"
        mr="4"
        bg={color}
        rounded="full"
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons
          name={`arrow-${direction}`}
          size={18}
          color={direction == "up" ? "green" : "red"}
        />
      </Box>
    );
  };

  return (
    <SafeAreaView>
      <Box bg="dark.100" px="7" pt="8" pb="2">
        <Flex direction="row" justify="space-between">
          <Ionicons name="search-outline" size={32} color="white" />
          <Text fontSize="2xl" fontWeight={400} mb="5" color="white">
            Transactions
          </Text>
          <Ionicons
            name="person-outline"
            size={32}
            color="white"
            onPress={() => navigation.navigate("ProfileIndex")}
          />
        </Flex>
      </Box>
      <Box bg="white" shadow={2} py="5" alignItems="center">
        <Text fontWeight={600} fontSize="3xl">
          €{accountBalance ? accountBalance.balanceAmount.amount : ""}
        </Text>
        <Text fontSize="xs" color="coolGray.500" mt="2">
          Current Balance
        </Text>
      </Box>
      {/* Transactions */}

      <Flex direction="row" mt="5">
        <Badge
          colorScheme="info"
          variant="subtle"
          alignSelf="flex-start"
          ml="7"
        >
          <Text fontSize="sm" fontWeight={600} color="darkBlue.500">
            Latest
          </Text>
        </Badge>
        <Badge
          colorScheme="info"
          variant="outline"
          alignSelf="flex-start"
          ml="3"
          borderWidth={0}
        >
          <Text fontSize="sm" fontWeight={600} color="gray.500">
            Category
          </Text>
        </Badge>
        <Badge
          colorScheme="info"
          variant="outline"
          alignSelf="flex-start"
          ml="3"
          borderWidth={0}
        >
          <Text fontSize="sm" fontWeight={600} color="gray.500">
            Country
          </Text>
        </Badge>
      </Flex>

      <Box mx="7" mt="8" flex={1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 490 }}
        >
          {accountTransactions ? (
            accountTransactions.map((transaction, index) => {
              return (
                <React.Fragment key={index}>
                  <Flex direction="row" justify="space-between" mb="6">
                    <Flex direction="row" alignItems="center">
                      <TransactionIcon
                        color={
                          transaction.transactionAmount.amount.includes("-")
                            ? "red.300"
                            : "green.300"
                        }
                        direction={
                          transaction.transactionAmount.amount.includes("-")
                            ? "down"
                            : "up"
                        }
                      />
                      <Box maxW="2/3">
                        <Text fontWeight={600}>
                          {transaction.remittanceInformationUnstructured}
                        </Text>
                        <Text>
                          {moment(transaction.bookingDate).format("D MMM YYYY")}
                        </Text>
                      </Box>
                    </Flex>
                    {/* if transaction has - then it should be RED */}
                    <Box
                      bg={
                        transaction.transactionAmount.amount.includes("-")
                          ? "transparent"
                          : "green.200"
                      }
                      p={0.5}
                      alignSelf="center"
                    >
                      <Text
                        fontWeight={600}
                        color={
                          transaction.transactionAmount.amount.includes("-")
                            ? "red.600"
                            : "green.700"
                        }
                      >
                        €{transaction.transactionAmount.amount}
                      </Text>
                    </Box>
                  </Flex>
                </React.Fragment>
              );
            })
          ) : (
            <></>
          )}
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Index;
