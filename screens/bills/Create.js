import { Link } from "@react-navigation/native";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Flex,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
  View,
  WarningOutlineIcon,
} from "native-base";
import { useState } from "react";
import { SafeAreaView, DatePickerIOS } from "react-native";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

const Create = ({ navigation }) => {
  //   const [responseErrors, setResponseErrors] = useState(null);
  //   const [name, setName] = useState("");
  //   const [amount, setAmount] = useState("");
  //   const [icon, setIcon] = useState("airplane-outline");
  //   const [colour, setColor] = useState("#dbeafe");
  //   const [iconColour, setIconColor] = useState("#3b82f6");
  const [chosenDate, setChosenDate] = useState(new Date());
  const [recurring, setRecurring] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      description: "",
    },
  });

  const authToken = useSelector((state) => state.auth.authToken);

  const addBill = (data) => {
    axios
      .post(
        "http://localhost:8000/bills/",
        {
          name: data.name,
          amount: data.amount,
          description: data.description,
          due_date: chosenDate,
          recurring: recurring,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.authToken}`,
          },
        }
      )
      .then((res) => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "TabScreens" }],
          })
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <View flex={1} backgroundColor="white">
      <SafeAreaView>
        <Box mx="8" mt="6">
          <Stack space={6}>
            <FormControl isInvalid={errors.name} isRequired>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FormControl.Label _text={{ fontSize: 12 }}>
                      Bill Name
                    </FormControl.Label>
                    <Input
                      type="text"
                      size="2xl"
                      variant="outline"
                      rounded="lg"
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

            <FormControl isInvalid={errors.amount} isRequired>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[0-9]+$/,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FormControl.Label _text={{ fontSize: 12 }}>
                      Bill Amount
                    </FormControl.Label>
                    <Input
                      type="text"
                      size="2xl"
                      variant="outline"
                      rounded="lg"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  </>
                )}
                name="amount"
              />
              {errors.amount && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  This field is required.
                </FormControl.ErrorMessage>
              )}
              {errors.amount?.type === "pattern" && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  This field must contain numbers only.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.description}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FormControl.Label _text={{ fontSize: 12 }}>
                      Short Description
                    </FormControl.Label>
                    <Input
                      type="text"
                      size="2xl"
                      variant="outline"
                      rounded="lg"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  </>
                )}
                name="description"
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label _text={{ fontSize: 12 }}>
                Due Date
              </FormControl.Label>
              <DatePickerIOS date={chosenDate} onDateChange={setChosenDate} />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label _text={{ fontSize: 12 }}>
                Occuring
              </FormControl.Label>
              <Select
                size="2xl"
                defaultValue="blue"
                selectedValue={recurring}
                accessibilityLabel="Select Occurance"
                placeholder="Weekly"
                onValueChange={(itemValue) => {
                  setRecurring(itemValue);
                }}
              >
                <Select.Item label="Weekly" value="weekly" fontSize="2xl" />
                <Select.Item
                  label="Fortnight"
                  value="fortnight"
                  fontSize="2xl"
                />
                <Select.Item label="Monthly" value="monthly" fontSize="2xl" />
                <Select.Item label="Yearly" value="yearly" fontSize="2xl" />
              </Select>
              <FormControl.ErrorMessage>
                Something is wrong.
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              size="lg"
              mb="4"
              bg="blue.500"
              py="3"
              onPress={handleSubmit(addBill)}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </SafeAreaView>
    </View>
  );
};

export default Create;
