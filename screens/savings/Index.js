import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Box, Center, Flex, Progress, Text } from "native-base";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import ProgressCircle from "react-native-progress-circle";

const Index = ({ navigation }) => {
  const [savingsList, setSavingsList] = useState([]);
  const [initialSavingsGoal, setInitialSavingsGoal] = useState("");
  const [totalSavingsGoal, setTotalSavingsGoal] = useState("");
  const [initialSavingsTotal, setInitialSavingsTotal] = useState("");
  const [currentSavingsTotal, setCurrentSavingsTotal] = useState("");
  const [savingsStatus, setSavingsStatus] = useState("");
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    getSavings();
  });

  const getSavings = () => {
    axios
      .get("http://localhost:8000/savings/", {
        headers: {
          Authorization: `Bearer ${authToken.authToken}`,
        },
      })
      .then((res) => {
        setSavingsList(res.data.savings);
        getTotalSavingGoal(savingsList);
        getCurrentSavingsTotal(savingsList);
        setSavingsStatus(
          getPercentage(initialSavingsTotal, initialSavingsGoal)
        );
      })
      .catch((err) => console.log(err));
  };

  const getTotalSavingGoal = (array) => {
    let sum = 0;
    for (var i = 0; i < array.length; i++) sum += parseInt(array[i].amount);
    setInitialSavingsGoal(sum);
    setTotalSavingsGoal(currencyFormatter(sum));
  };

  const getCurrentSavingsTotal = (array) => {
    let sum = 0;
    for (var i = 0; i < array.length; i++)
      sum += parseInt(array[i].current_amount);
    setInitialSavingsTotal(sum);
    setCurrentSavingsTotal(currencyFormatter(sum));
  };

  const currencyFormatter = (amount) => {
    if (!amount) return null;
    // console.log(amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const getPercentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };

  return (
    <SafeAreaView>
      <Box bg="dark.100" h={32}>
        {/* Header */}
        <Box
          mx="6"
          mt="6"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="white" fontSize="2xl" fontFamily="body" fontWeight={400}>
            Savings
          </Text>
          <Ionicons
            name="add-outline"
            color="white"
            size={34}
            onPress={() => navigation.navigate("SavingsCreate")}
          />
        </Box>

        <Box
          mt={5}
          py="8"
          borderBottomWidth={1}
          borderBottomColor="coolGray.300"
          shadow={1}
          bg="white"
        >
          {/* Balance */}
          <Flex alignItems="center">
            <Text fontSize={12} color="coolGray.700">
              Total Savings Balance
            </Text>
            {currentSavingsTotal ? (
              <Text fontSize={32} fontWeight="600" my="3">
                € {currentSavingsTotal || "0"}
              </Text>
            ) : (
              <Text fontSize={32} fontWeight="600" my="3">
                € 0
              </Text>
            )}
            <Box w="40%" maxW="400">
              <Progress colorScheme="emerald" value={savingsStatus || 0} />
            </Box>
            {totalSavingsGoal ? (
              <Text fontSize={13} fontWeight="500" mt="2" mb="3">
                €{" "}
                {currentSavingsTotal ? (
                  <>{currentSavingsTotal}</>
                ) : (
                  <Text fontSize={13} fontWeight="500" mt="2" mb="3">
                    0
                  </Text>
                )}
                / € {totalSavingsGoal}
              </Text>
            ) : (
              <Text fontSize={13} fontWeight="500" mt="2" mb="3">
                € 0/ € 0
              </Text>
            )}
          </Flex>
        </Box>

        {/* Main body */}
        <Box m="8" flex={1}>
          <ScrollView style={{ paddingBottom: 490 }}>
            <Flex direction="row" flexWrap="wrap" justify="space-between">
              {savingsList &&
                savingsList.map((saving, index) => (
                  <Box
                    bg={saving.colour}
                    borderColor="coolGray.200"
                    borderWidth={1}
                    p="4"
                    w="48%"
                    mb={4}
                    rounded="md"
                    key={index}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SavingsShow", {
                          ID: saving._id,
                        })
                      }
                    >
                      <Flex
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Ionicons
                          name={saving.icon}
                          size={36}
                          color={saving.icon_color}
                        />
                        <Box
                          borderWidth={1}
                          rounded="full"
                          w="50"
                          h="50"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ProgressCircle
                            percent={Math.floor(
                              getPercentage(
                                saving.current_amount,
                                saving.amount
                              )
                            )}
                            radius={35}
                            borderWidth={4}
                            color={saving.icon_color}
                            bgColor={saving.colour}
                          >
                            <Text style={{ fontSize: 14 }}>
                              {Math.floor(
                                getPercentage(
                                  saving.current_amount,
                                  saving.amount
                                )
                              )}
                              %
                            </Text>
                          </ProgressCircle>
                        </Box>
                      </Flex>
                      <Text fontWeight={600} fontSize="14" mt="3" mb="2">
                        {saving.name}
                      </Text>
                      <Text fontSize={12}>€{saving.amount}.00</Text>
                    </TouchableOpacity>
                  </Box>
                ))}
              {!savingsList.length ? <Text>No savings found</Text> : <></>}

              {/* Add button */}
              <Box alignSelf="center" alignItems="center" w="48%">
                <Pressable onPress={() => navigation.navigate("SavingsCreate")}>
                  <Box
                    bg="blue.500"
                    w="68"
                    h="68"
                    borderWidth="1"
                    borderColor="coolGray.200"
                    shadow="1"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons name="add" size={32} color="white" />
                  </Box>
                </Pressable>
                <Text color="blue.500" fontWeight={600} mt="1">
                  New Saving
                </Text>
              </Box>
            </Flex>
          </ScrollView>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
export default Index;
