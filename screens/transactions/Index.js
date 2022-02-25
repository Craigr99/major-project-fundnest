import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Box, Flex, ScrollView, Text } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";

const Index = () => {
  const [accountTransactions, setAccountTransactions] = useState([]);
  const userAccountID = useSelector((state) => state.user.accountID.accountID);
  const nordigenToken = useSelector(
    (state) => state.auth.nordigenToken.nordigenToken
  );

  useEffect(() => {
    // get account transactions
    getTransactions();
  }, []);

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
        setAccountTransactions(res.data.transactions.booked.slice(0, 9));
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
      {/* Transactions */}
      <Box mx="7" mt="8">
        <Flex direction="row" justify="space-between">
          <Ionicons name="search-outline" size={32} />
          <Text fontSize="2xl" mb="5">
            Transactions
          </Text>
          <Ionicons name="person-outline" size={32} />
        </Flex>
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
