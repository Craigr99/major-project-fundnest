import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  Text,
  Box,
  Avatar,
  Center,
  Flex,
  Divider,
  Button,
  Icon,
} from "native-base";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

const Index = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const authToken = useSelector((state) => state.auth.authToken);

  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken.authToken}`,
          },
        }
      )
      .then((res) => {
        navigation.navigate("Welcome");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView>
      <Box alignItems="center" my={10}>
        <Box position="relative">
          <Avatar
            bg="lightBlue.400"
            source={{
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
            size="2xl"
          >
            NB
          </Avatar>
          <Box
            bg="blue.500"
            w={8}
            h={8}
            rounded="full"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top={85}
            right={-5}
          >
            <Ionicons name="pencil-outline" size={18} color="#fff" />
          </Box>
        </Box>
      </Box>

      <Center>
        <Text fontSize="3xl" fontWeight={600}>
          {user.name}
        </Text>
      </Center>

      {/* main body */}
      <Box mx={6} mt={3}>
        <Text fontSize="xl" fontWeight={600} mt={5}>
          Account Information
        </Text>

        <Flex
          mt={8}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex direction="row" alignItems="center">
            <Ionicons name="person" size={26} color="#3b82f6" />
            <Text ml={4} fontSize="md">
              Name
            </Text>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Text mr={4} color="gray.500" fontSize="md">
              {user.name}
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </Flex>
        </Flex>
        <Divider my={4} thickness={1} bg="coolGray.300" />
        <Flex
          mt={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex direction="row" alignItems="center">
            <Ionicons name="mail-open" size={26} color="#3b82f6" />
            <Text ml={4} fontSize="md">
              Email
            </Text>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Text mr={4} color="gray.500" fontSize="md">
              {user.email}
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </Flex>
        </Flex>
        <Divider my={4} thickness={1} bg="coolGray.300" />

        <Text fontSize="xl" fontWeight={600} mt={5}>
          Actions
        </Text>
        <Box alignItems="flex-start" mt={3}>
          <Button
            onPress={logoutUser}
            bg="blue.400"
            leftIcon={<Icon as={Ionicons} name="log-out-outline" size="sm" />}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};
export default Index;
