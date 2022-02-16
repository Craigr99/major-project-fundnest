import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  WarningOutlineIcon,
} from "native-base";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import PiggyBank from "../../assets/img/icon_piggy_bank.svg";
import { SECRET_ID, SECRET_KEY } from "@env";
import { setAuthToken, setNordigenToken } from "../../features/auth";
import { setUser } from "../../features/user";
import axios from "axios";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("Craig Redmond");
  const [number, setNumber] = useState("0851263372");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("132123123");

  const register = () => {
    // store user in database
    axios
      .post("http://localhost:8000/users/register", {
        name: name,
        email: email,
        passcode: passcode,
        number: number,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setAuthToken({ authToken: res.data.auth_token }));
        dispatch(setUser({ name: name, email: email, number: number }));
      })
      .catch((err) => console.log(err));

    // create a nordigen access token
    // navigate to banks list screen
    axios
      .post("https://ob.nordigen.com/api/v2/token/new/", {
        secret_id: SECRET_ID,
        secret_key: SECRET_KEY,
      })
      .then((res) => {
        dispatch(setNordigenToken({ nordigenToken: res.data.access }));
        console.log(res.data.access);
        navigation.navigate("BanksList");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaProvider>
      <KeyboardAwareScrollView>
        <Box h="1/6">
          <Center mt="16">
            <PiggyBank height="250" />
          </Center>
        </Box>

        <Box h="5/6" bg="trueGray.300" borderTopRadius="3xl" py="10" px="8">
          <Heading size="xl" color="dark.200" alignSelf="center" my="6">
            Create Account
          </Heading>
          <Box>
            <Box>
              <Stack space={4}>
                <FormControl isRequired>
                  <FormControl.Label>Full Name</FormControl.Label>
                  <Input
                    name="name"
                    type="text"
                    size="2xl"
                    variant="filled"
                    onChangeText={(newText) => setName(newText)}
                  />

                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input
                    type="number"
                    size="2xl"
                    variant="filled"
                    onChangeText={(newText) => setNumber(newText)}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Email Address</FormControl.Label>
                  <Input
                    type="text"
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
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  size="lg"
                  mb="4"
                  mt="6"
                  bg="blue.500"
                  py="3"
                  onPress={register}
                >
                  Sign Up
                </Button>
                <Text alignSelf="center">
                  Already have an account?{" "}
                  <Link
                    onPress={() => navigation.navigate("Login")}
                    isUnderlined={false}
                    _text={{
                      color: "blue.600",
                    }}
                  >
                    {" "}
                    Sign in
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

export default Register;
