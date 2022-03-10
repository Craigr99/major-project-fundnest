import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Box, Divider, Flex, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import ProgressCircle from "react-native-progress-circle";

const Show = ({ route, navigation }) => {
  const { ID } = route.params;
  const [saving, setSaving] = useState({});
  const [totalSavingsGoal, setTotalSavingsGoal] = useState("");
  const [currentSavingsTotal, setCurrentSavingsTotal] = useState("");

  useEffect(() => {
    getSaving();
  }, []);

  const getSaving = () => {
    axios
      .get(`http://localhost:8000/savings/${ID}`)
      .then((res) => {
        setSaving(res.data.saving);
      })
      .catch((err) => console.log(err));
  };

  const currencyFormatter = (amount) => {
    if (!amount) return 0;
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const getPercentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };

  getPercentage();

  return (
    <SafeAreaView>
      <View>
        {saving ? (
          <View>
            <Box mt={8} alignSelf="center">
              <ProgressCircle
                percent={Math.floor(
                  getPercentage(saving.current_amount, saving.amount)
                )}
                radius={90}
                borderWidth={4}
                color={saving.icon_color}
                bgColor="white"
              >
                <Ionicons
                  name={saving.icon}
                  size={82}
                  color={saving.icon_color}
                />
              </ProgressCircle>
            </Box>

            <Box mx={6} mt={8}>
              <Text fontSize="xl" fontWeight={600}>
                {saving.name}
              </Text>

              <Flex direction="row" alignItems="baseline" my={3}>
                <Text fontSize="3xl" color="blue.500" fontWeight={600}>
                  €{currencyFormatter(parseInt(saving.current_amount))}
                </Text>
                <Text ml={2} fontSize="lg" color="gray.500">
                  of €{currencyFormatter(parseInt(saving.amount))}
                </Text>
              </Flex>

              <Text fontSize="xl" fontWeight={600} mt={5}>
                Goal
              </Text>

              <Box mt={5}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text>Name</Text>
                  <Flex direction="row" alignItems="center">
                    <Text mr={4} color="gray.500">
                      {saving.name}
                    </Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </Flex>
                </Flex>
                <Divider my={4} thickness={1} bg="coolGray.300" />
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Text>Icon</Text>
                  <Flex direction="row" alignItems="center">
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </Flex>
                </Flex>
                <Divider my={4} thickness={1} bg="coolGray.300" />
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Text>Amount</Text>
                  <Flex direction="row" alignItems="center">
                    <Text mr={4} color="gray.500">
                      €{currencyFormatter(parseInt(saving.amount))}
                    </Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </Flex>
                </Flex>
                <Divider my={4} thickness={1} bg="coolGray.300" />
              </Box>

              <Text fontSize="xl" fontWeight={600} mt={5}>
                Options
              </Text>

              <Box mt={5}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text>Add funds</Text>
                  <Flex direction="row" alignItems="center">
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </Flex>
                </Flex>
                <Divider my={4} thickness={1} bg="coolGray.300" />
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Text>Withdraw funds</Text>
                  <Flex direction="row" alignItems="center">
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </Flex>
                </Flex>
                <Divider my={4} thickness={1} bg="coolGray.300" />
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Text>Delete saving goal</Text>
                  <Flex direction="row" alignItems="center">
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </View>
        ) : (
          <Text>none</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Show;
