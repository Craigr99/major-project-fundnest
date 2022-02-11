import {
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  Link,
  Stack,
  WarningOutlineIcon,
  Button,
  Text,
} from "native-base";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PiggyBank from "../../assets/img/icon_piggy_bank.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user";
import { setAuthToken } from "../../features/auth";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");

  const loginUser = () => {
    axios
      .post("http://localhost:8000/users/login", {
        email: email,
        passcode: passcode,
      })
      .then((res) => {
        dispatch(setAuthToken({ authToken: res.data.auth_token }));

        dispatch(
          setUser({ name: res.data.info.name, email: email, number: "" })
        );
        navigation.navigate("Home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaProvider>
      <KeyboardAwareScrollView>
        <Box h="2/6">
          <Center mt="16">
            <PiggyBank height="250" />
          </Center>
        </Box>

        <Box
          h="3/5"
          bg="trueGray.300"
          mt="16"
          borderTopRadius="3xl"
          py="10"
          px="8"
        >
          <Heading size="xl" color="dark.200" alignSelf="center" my="6">
            Sign In
          </Heading>
          <Box>
            <Box>
              <Stack space={4}>
                <FormControl isRequired>
                  <FormControl.Label>Email Address</FormControl.Label>
                  <Input
                    type="text"
                    placeholder="test@test.com"
                    size="2xl"
                    variant="filled"
                    onChangeText={(newText) => setEmail(newText)}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Passcode</FormControl.Label>
                  <Input
                    type="password"
                    size="2xl"
                    variant="filled"
                    onChangeText={(newText) => setPasscode(newText)}
                  />
                  <FormControl.HelperText alignSelf="flex-end">
                    <Link href="#" isUnderlined={false}>
                      Forgot Passcode?
                    </Link>
                  </FormControl.HelperText>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  size="lg"
                  mb="4"
                  bg="blue.500"
                  py="3"
                  onPress={loginUser}
                >
                  Sign In
                </Button>
                <Text alignSelf="center">
                  Don't have an account?{" "}
                  <Link
                    isUnderlined={false}
                    onPress={() => navigation.navigate("Register")}
                    _text={{
                      color: "blue.600",
                    }}
                  >
                    {" "}
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </Box>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Login;
