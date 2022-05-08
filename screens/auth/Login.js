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
import { setNordigenToken } from "../../features/auth";
import { getUserAccount } from "../../features/user";
import { SECRET_ID, SECRET_KEY } from "@env";
import { useForm, Controller } from "react-hook-form";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [responseErrors, setResponseErrors] = useState(null);
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      passcode: "",
    },
  });

  const loginUser = (data) => {
    console.log(data);
    // create a nordigen access token
    axios
      .post("https://ob.nordigen.com/api/v2/token/new/", {
        secret_id: SECRET_ID,
        secret_key: SECRET_KEY,
      })
      .then((res) => {
        dispatch(setNordigenToken({ nordigenToken: res.data.access }));
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:8000/users/login", {
        email: data.email,
        passcode: data.passcode,
      })
      .then((res) => {
        dispatch(setAuthToken({ authToken: res.data.auth_token }));

        dispatch(
          setUser({ name: res.data.info.name, email: data.email, number: "" })
        );

        // check if user has existing account(s)
        axios
          .get("http://localhost:8000/accounts/", {
            headers: {
              Authorization: `Bearer ${res.data.auth_token}`,
            },
          })
          .then((res) => {
            if (res.data.accounts.length > 0) {
              dispatch(
                getUserAccount({ accountID: res.data.accounts[0].account_id })
              );
              navigation.navigate("TabScreens");
            } else {
              // no existing accounts
              // navigate to banks list screen

              navigation.navigate("BanksList");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err) {
          setResponseErrors("Invalid login - please try again");
        }
      });
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
                <FormControl isInvalid={errors.email || responseErrors}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 3,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <FormControl.Label>Email Address</FormControl.Label>
                        <Input
                          name="email"
                          type="email"
                          size="2xl"
                          placeholder="test@test.com"
                          variant="filled"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          autoCapitalize="none"
                        />
                      </>
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      This field is required.
                    </FormControl.ErrorMessage>
                  )}
                  {errors.email?.type === "minLength" && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Email must be at least 3 characters long.
                    </FormControl.ErrorMessage>
                  )}
                  {responseErrors && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {responseErrors}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.passcode}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 5,
                      pattern: /^[0-9]+$/,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <FormControl.Label>Passcode</FormControl.Label>
                        <Input
                          name="passcode"
                          type="password"
                          size="2xl"
                          variant="filled"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </>
                    )}
                    name="passcode"
                  />
                  {errors.passcode && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      This field is required.
                    </FormControl.ErrorMessage>
                  )}
                  {errors.passcode?.type === "minLength" && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Passcode must be at least 5 characters long.
                    </FormControl.ErrorMessage>
                  )}
                  {errors.passcode?.type === "pattern" && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      This field must contain numbers only
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <Button
                  size="lg"
                  mb="4"
                  bg="blue.500"
                  py="3"
                  onPress={handleSubmit(loginUser)}
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
