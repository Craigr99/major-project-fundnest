import { Ionicons } from "@expo/vector-icons";
import { Box, Flex, Text, View, NBBox, Pressable } from "native-base";
import { SafeAreaView } from "react-native";

const AddItemIndex = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Box>
        <Box bg="dark.100" position="absolute" top={-50} w="100%" py={8} px={6}>
          <Text fontSize="2xl" fontWeight={400} mt={8} color="white">
            Add a New:
          </Text>
        </Box>
      </Box>
      <View mx={6} position="absolute" top={140}>
        <Pressable
          onPress={() => console.log(navigation.navigate("SavingsCreate"))}
        >
          <Box
            flexDir="row"
            alignItems="center"
            mt={5}
            borderWidth={1}
            borderColor="coolGray.300"
            borderBottomColor="blue.500"
            borderBottomWidth={3}
            borderRightColor="blue.500"
            borderRightWidth={4}
            rounded="lg"
            px="4"
            py="6"
          >
            <Box
              borderWidth={1}
              rounded="full"
              w={16}
              h={16}
              alignItems="center"
              justifyContent="center"
              borderColor="blue.500"
            >
              <Ionicons name="cash-outline" size={30} color="#3b82f6" />
            </Box>
            <Flex ml={4}>
              <Text fontSize="xl" fontWeight={500}>
                Saving
              </Text>
              <Text color="coolGray.500">New goal to help save money</Text>
            </Flex>
            <Box alignSelf="center" ml="auto">
              <Ionicons name="add-outline" size={28} color="#3b82f6" />
            </Box>
          </Box>
        </Pressable>

        <Box
          flexDir="row"
          alignItems="center"
          mt={5}
          borderWidth={1}
          borderColor="coolGray.300"
          borderBottomColor="blue.500"
          borderBottomWidth={3}
          borderRightColor="blue.500"
          borderRightWidth={4}
          rounded="lg"
          px="4"
          py="6"
        >
          <Box
            borderWidth={1}
            rounded="full"
            w={16}
            h={16}
            alignItems="center"
            justifyContent="center"
            borderColor="blue.500"
          >
            <Ionicons name="calendar-outline" size={30} color="#3b82f6" />
          </Box>
          <Flex ml={4}>
            <Text fontSize="xl" fontWeight={500}>
              Bill
            </Text>
            <Text color="coolGray.500" maxW="3/4">
              Keep track of a bill or subscription
            </Text>
          </Flex>
          <Box alignSelf="center" ml="auto">
            <Ionicons name="add-outline" size={28} color="#3b82f6" />
          </Box>
        </Box>
        <Pressable onPress={() => navigation.navigate("BanksList")}>
          <Box
            flexDir="row"
            alignItems="center"
            mt={5}
            borderWidth={1}
            borderColor="coolGray.300"
            borderBottomColor="blue.500"
            borderBottomWidth={3}
            borderRightColor="blue.500"
            borderRightWidth={4}
            rounded="lg"
            px="4"
            py="6"
          >
            <Box
              borderWidth={1}
              rounded="full"
              w={16}
              h={16}
              alignItems="center"
              justifyContent="center"
              borderColor="blue.500"
            >
              <Ionicons name="wallet-outline" size={30} color="#3b82f6" />
            </Box>
            <Flex ml={4}>
              <Text fontSize="xl" fontWeight={500}>
                Account
              </Text>
              <Text color="coolGray.500" maxW="48">
                Link another bank account to the app
              </Text>
            </Flex>
            <Box alignSelf="center" ml="auto">
              <Ionicons name="add-outline" size={28} color="#3b82f6" />
            </Box>
          </Box>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddItemIndex;
