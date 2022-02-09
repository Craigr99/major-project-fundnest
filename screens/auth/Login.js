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
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PiggyBank from "../../assets/img/icon_piggy_bank.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ navigation }) => {
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
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Passcode</FormControl.Label>
                  <Input type="password" size="2xl" variant="filled" />
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
                <Button size="lg" mb="4" bg="blue.500" py="3">
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
