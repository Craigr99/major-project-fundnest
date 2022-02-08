import axios from "axios";
import { Image, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../features/auth";
import { SECRET_ID, SECRET_KEY } from "@env";
import {
  Center,
  Container,
  Heading,
  Text,
  NativeBaseProvider,
  Box,
  Button,
  extendTheme,
} from "native-base";
import Vault from "../../assets/img/icon_vault.svg";
import { Link } from "@react-navigation/native";

// const SECRET_ID = "4bd50407-2893-45cc-aa67-e5cca02fb0db";
// const SECRET_KEY =
//   "c3fa951ad29d76a5425e77184cb824df753bc0c352b561b53d6dcaec83b95d20ba1fb491406b4fdaf975578eb9f9f23f1a85ba767313c1a7793b4b109fe50297";

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();

  const getToken = () => {
    axios
      .post("https://ob.nordigen.com/api/v2/token/new/", {
        secret_id: SECRET_ID,
        secret_key: SECRET_KEY,
      })
      .then((res) => {
        dispatch(setAuthToken({ token: res.data.access }));
        navigation.navigate("BanksList");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView>
      <Box
        alignItems="center"
        justifyConrtent="center"
        bg="trueGray.300"
        mx="6"
        mt="10"
        py="16"
        borderRadius="xl"
        h="xl"
      >
        <Center>
          <Heading size="2xl" color="dark.50">
            App Name
          </Heading>
        </Center>
        <Center flex={1}>
          <Vault height="150" />
        </Center>
      </Box>
      <Box mx="6">
        <Text alignSelf="center" fontSize="lg" my="10">
          Best way to save your money!
        </Text>
        <Button
          size="lg"
          mb="4"
          bg="blue.500"
          py="3"
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Button>
        <Button
          size="lg"
          borderWidth="1"
          borderColor="gray.400"
          bg="white"
          py="3"
          onPress={() => navigation.navigate("Login")}
        >
          Sign In
        </Button>
      </Box>
    </SafeAreaView>
    // {/* <Text>Welcome to The App!</Text>
    // <Button title="Get Auth Token" onPress={getToken} /> */}
  );
};

export default Welcome;