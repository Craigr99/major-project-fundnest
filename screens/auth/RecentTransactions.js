import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Box, Flex, ScrollView, Text } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

const RecentTransactions = () => {
  const [accountTransactions, setAccountTransactions] = useState([]);

  useEffect(() => {
    // get account transactions
    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/1048f194-cb13-4cee-a55c-5ef6d8661341/transactions/`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1MTMwNDMwLCJqdGkiOiI4OTlmOTAwYWJlNGY0ZmUzOWZmOWEzOTBmYmYwMTg3ZCIsImlkIjo3MDA3LCJzZWNyZXRfaWQiOiI0YmQ1MDQwNy0yODkzLTQ1Y2MtYWE2Ny1lNWNjYTAyZmIwZGIiLCJhbGxvd2VkX2NpZHJzIjpbIjAuMC4wLjAvMCIsIjo6LzAiXX0.IRIj30gfNIBhQ_Lpb1NgCDlo44GwJFOONRUhqFq6b5Y`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.transactions.booked.slice(0, 5));
        setAccountTransactions(res.data.transactions.booked.slice(0, 9));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
      {/* Transactions */}
      <Box mx="7" mt="8">
        <Text fontSize="2xl" mb="5">
          Transactions
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {accountTransactions ? (
            accountTransactions.map((transaction, index) => {
              return (
                <Flex
                  direction="row"
                  justify="space-between"
                  mb="6"
                  key={index}
                >
                  <Flex direction="row" alignItems="center">
                    <Box
                      w="12"
                      h="12"
                      mr="4"
                      bg="red.300"
                      rounded="full"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Ionicons name="arrow-down" size={18} />
                    </Box>
                    <Box maxW="2/3">
                      <Text fontWeight={600}>
                        {transaction.remittanceInformationUnstructured}
                      </Text>
                      <Text>{transaction.bookingDate}</Text>
                    </Box>
                  </Flex>
                  <Text>{transaction.transactionAmount.amount}</Text>
                </Flex>
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

export default RecentTransactions;
