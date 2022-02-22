import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Box, Center, Flex, Progress, Text } from "native-base";
import { Pressable, SafeAreaView, TouchableOpacity } from "react-native";

const Index = ({ navigation }) => {
  const testarray = [1, 2, 3];

  return (
    <Box bg="dark.100" h={32}>
      <SafeAreaView>
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
            size={32}
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
            <Text fontSize={32} fontWeight="600" my="3">
              €2,192.00
            </Text>
            <Box w="40%" maxW="400">
              <Progress colorScheme="emerald" value={55} />
            </Box>
            <Text fontSize={13} fontWeight="500" mt="2">
              € 2,192.00/ € 11,000.00
            </Text>
          </Flex>
        </Box>

        {/* Main body */}

        <Box m="8">
          <Flex direction="row" flexWrap="wrap" justify="space-between">
            {testarray.map((item, index) => (
              <Box
                bg="rgba(195, 234, 255, 0.5)"
                borderColor="coolGray.200"
                borderWidth={1}
                p="4"
                w="48%"
                mb={4}
                rounded="md"
                key={index}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("SavingsShow")}
                >
                  <Flex
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <FontAwesome name="plane" size={36} color="#4584FF" />
                    <Box
                      borderWidth={1}
                      rounded="full"
                      w="50"
                      h="50"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize={13} fontWeight="500">
                        50%
                      </Text>
                    </Box>
                  </Flex>
                  <Text fontWeight={600} fontSize="14" mt="3" mb="2">
                    Savings For Holidays
                  </Text>
                  <Text fontSize={12}>€1,127.00</Text>
                </TouchableOpacity>
              </Box>
            ))}
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
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default Index;
