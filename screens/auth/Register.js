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
import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PiggyBank from "../../assets/img/icon_piggy_bank.svg";

const Register = ({ navigation }) => {
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
                  <Input type="text" size="2xl" variant="filled" />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input type="number" size="2xl" variant="filled" />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Email Address</FormControl.Label>
                  <Input type="text" size="2xl" variant="filled" />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Passcode</FormControl.Label>
                  <Input type="password" size="2xl" variant="filled" />
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
                  onPress={() => navigation.navigate("Login")}
                >
                  Sign Up
                </Button>
                <Text alignSelf="center">
                  Already have an account?{" "}
                  <Link
                    isUnderlined={false}
                    onPress={() => navigation.navigate("Login")}
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
