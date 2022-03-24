import { Ionicons } from "@expo/vector-icons";
import { Badge, Box, Center, Flex, Text } from "native-base";
import { SafeAreaView } from "react-native";

const Index = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Box bg="dark.100" h={20}>
        {/* Header */}
        <Box
          mx="6"
          mt="6"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color="white" fontSize="2xl" fontFamily="body" fontWeight={400}>
            Bills & Subscriptions
          </Text>
          <Ionicons
            name="add-outline"
            color="white"
            size={34}
            onPress={() => navigation.navigate("BillsCreate")}
          />
        </Box>

        {/* main body */}
        <Box mt={12}>
          <Flex direction="row" mx="6">
            <Badge colorScheme="info" variant="subtle" alignSelf="flex-start">
              <Text fontSize="sm" fontWeight={600} color="darkBlue.500">
                Bills
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
                Subscriptions
              </Text>
            </Badge>
          </Flex>

          <Flex
            mt={10}
            mx="6"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Text fontWeight={500}>Upcoming Bills</Text>
              <Text fontWeight={700} fontSize="xl" mt={1}>
                €2,122.00 due
              </Text>
            </Box>
            <Ionicons name="calendar-outline" size={28} />
          </Flex>
          {/* Due */}
          <Box>
            <Box mt={6} py="2" px="6" bg="coolGray.200">
              <Text fontWeight={600}>Due</Text>
            </Box>
            <Flex
              my={6}
              mx={6}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex direction="row">
                <Text textAlign="center" color="coolGray.500">
                  Wed{"\n"}23
                </Text>
                <Box ml={4}>
                  <Text fontSize="md" fontWeight={600}>
                    Home Rent
                  </Text>
                  <Text color="coolGray.500">Pay rent for the month</Text>
                </Box>
              </Flex>
              <Box>
                <Text fontSize="md" fontWeight={600}>
                  €1698.00
                </Text>
                <Text color="red.500">Due yesterday</Text>
              </Box>
            </Flex>
            <Flex
              my={3}
              mx={6}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex direction="row">
                <Text textAlign="center" color="coolGray.500">
                  Fri{"\n"}25
                </Text>
                <Box ml={4}>
                  <Text fontSize="md" fontWeight={600}>
                    Car Loan
                  </Text>
                  <Text color="coolGray.500">Monthly loan for new car</Text>
                </Box>
              </Flex>
              <Box>
                <Text fontSize="md" fontWeight={600}>
                  €899.00
                </Text>
                <Text color="amber.500">Due tomorrow</Text>
              </Box>
            </Flex>
          </Box>
          <Box mt={3} py="2" px="6" bg="coolGray.200">
            <Text fontWeight={600}>Upcoming</Text>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Index;
