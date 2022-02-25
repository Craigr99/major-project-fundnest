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
import { useForm, Controller } from "react-hook-form";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [responseErrors, setResponseErrors] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      number: "",
      email: "",
      passcode: "",
    },
  });

  const register = (data) => {
    // store user in database
    axios
      .post("http://localhost:8000/users/register", {
        name: data.name,
        email: data.email,
        passcode: data.passcode,
        number: data.number,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setAuthToken({ authToken: res.data.auth_token }));
        dispatch(
          setUser({ name: data.name, email: data.email, number: data.number })
        );

        // // create a nordigen access token
        // // navigate to banks list screen
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
      })
      .catch((err) => {
        if (err) {
          setResponseErrors(
            "Error - User with this email already exists in the database."
          );
        }
      });
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
                <FormControl isInvalid={errors.name}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 3,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <FormControl.Label>Full Name</FormControl.Label>
                        <Input
                          name="name"
                          type="text"
                          size="2xl"
                          variant="filled"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </>
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      This field is required.
                    </FormControl.ErrorMessage>
                  )}
                  {errors.name?.type === "minLength" && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Name must be at least 3 characters long.
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.number}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 3,
                      pattern: /^[0-9]+$/,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <Input
                          name="number"
                          type="number"
                          size="2xl"
                          variant="filled"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      </>
                    )}
                    name="number"
                  />
                  {errors.number && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      This field is required.
                    </FormControl.ErrorMessage>
                  )}
                  {errors.number?.type === "minLength" && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Phone must be at least 3 characters long.
                    </FormControl.ErrorMessage>
                  )}
                  {errors.number?.type === "pattern" && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      This field must contain numbers only
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
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
                          variant="filled"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
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
                      User already exists with this email.
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
                  mt="6"
                  bg="blue.500"
                  py="3"
                  onPress={handleSubmit(register)}
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
