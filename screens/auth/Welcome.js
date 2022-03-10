import { SafeAreaView } from "react-native";
import { Center, Heading, Text, Box, Button, extendTheme } from "native-base";
import Vault from "../../assets/img/icon_vault.svg";

// const SECRET_ID = "4bd50407-2893-45cc-aa67-e5cca02fb0db";
// const SECRET_KEY =
//   "c3fa951ad29d76a5425e77184cb824df753bc0c352b561b53d6dcaec83b95d20ba1fb491406b4fdaf975578eb9f9f23f1a85ba767313c1a7793b4b109fe50297";

const Welcome = ({ navigation }) => {
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
          <Heading
            fontFamily="body"
            fontWeight="500"
            size="2xl"
            color="dark.50"
          >
            FundNest
          </Heading>
        </Center>
        <Center flex={1}>
          <Vault height="150" />
        </Center>
      </Box>
      <Box mx="6">
        <Text
          fontFamily="body"
          fontWeight={500}
          alignSelf="center"
          fontSize="lg"
          my="10"
        >
          Best way to save your money!
        </Text>
        <Button
          size="lg"
          mb="4"
          bg="blue.500"
          py="3"
          borderRadius="lg"
          onPress={() => navigation.navigate("Register")}
        >
          <Text fontWeight={500} fontFamily="body" color="white" fontSize="md">
            Sign Up
          </Text>
        </Button>
        <Button
          size="lg"
          borderWidth="1"
          borderColor="gray.400"
          bg="white"
          py="3"
          borderRadius="lg"
          onPress={() => navigation.navigate("Login")}
        >
          <Text Text fontWeight={500} fontFamily="body" fontSize="md">
            Sign In
          </Text>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Welcome;
