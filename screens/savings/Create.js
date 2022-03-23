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
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

const Create = ({ navigation }) => {
  const [responseErrors, setResponseErrors] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [icon, setIcon] = useState("airplane-outline");
  const [colour, setColor] = useState("#dbeafe");
  const [iconColour, setIconColor] = useState("#3b82f6");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      icon: "",
      colour: "",
    },
  });

  const selectIcons = [
    {
      name: "airplane-outline",
    },
    {
      name: "american-football-outline",
    },
    {
      name: "barbell-outline",
    },
    {
      name: "basket-outline",
    },
    {
      name: "beer-outline",
    },
    {
      name: "bonfire-outline",
    },
    {
      name: "car-outline",
    },
    {
      name: "cart-outline",
    },
    {
      name: "earth-outline",
    },
  ];
  const selectColours = [
    {
      // blue.100
      name: "Blue",
      value: "#dbeafe",
      iconColor: "#3b82f6",
    },
    {
      // green.100
      name: "Green",
      value: "#dcfce7",
      iconColor: "#22c55e",
    },
    {
      // warning.100
      name: "Orange",
      value: "#ffedd5",
      iconColor: "#f97316",
    },
    {
      // muted.100
      name: "Gray",
      value: "#f5f5f5",
      iconColor: "#262626",
    },
    {
      // rose.100
      name: "Red",
      value: "#ffe4e6",
      iconColor: "#f43f5e",
    },
    {
      // pink.100
      name: "Pink",
      value: "#fce7f3",
      iconColor: "#ec4899",
    },
    {
      // violet.100
      name: "Purple",
      value: "#ede9fe",
      iconColor: "#8b5cf6",
    },
    {
      // cyan.100
      name: "Cyan",
      value: "#cffafe",
      iconColor: "#06b6d4",
    },
    {
      // dark.500
      name: "Dark",
      value: "#a1a1aa",
      iconColor: "#27272a",
    },
  ];

  const authToken = useSelector((state) => state.auth.authToken);

  const addSaving = (data) => {
    console.log(data);
    console.log(icon);
    console.log(colour);
    console.log(iconColour);

    axios
      .post(
        "http://localhost:8000/savings/",
        {
          name: data.name,
          amount: data.amount,
          icon: icon,
          colour: colour,
          icon_color: iconColour,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.authToken}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU1NDY2ODksIm5hbWUiOiJ0ZXN0IG5hbWUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NDU1MzIyODl9.aa9uP4G_WXbOtotYgDvmXTrvcwkved7Awrd-g37K-Cw`,
          },
        }
      )
      .then((res) => {
        // navigation.push("TabScreens");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "TabScreens" }],
          })
        );
      })
      .catch((err) => console.log(err));
  };
  const findColour = (colour) => {
    const result = selectColours.find(({ value }) => value === colour);
    setColor(result.value);
    setIconColor(result.iconColor);
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
                      Goal Name
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
                      Amount
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

            <Flex direction="row" justifyContent="space-between">
              <FormControl flex={1} mr="2">
                <FormControl.Label _text={{ fontSize: 12 }}>
                  Icon
                </FormControl.Label>
                <Select
                  size="2xl"
                  defaultValue="blue"
                  // selectedValue={value}
                  accessibilityLabel="Select Icon"
                  placeholder="Icon"
                  onValueChange={(itemValue) => {
                    setIcon(itemValue);
                  }}
                >
                  {selectIcons.map((icon, index) => (
                    <Select.Item
                      key={index}
                      label={
                        <Ionicons
                          key={index}
                          name={icon.name}
                          size={32}
                          color={iconColour}
                        />
                      }
                      selectedValue={icon.name}
                      value={icon.name}
                      my={1}
                      fontSize="2xl"
                    />
                  ))}
                </Select>
                <FormControl.ErrorMessage>
                  Something is wrong.
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl flex={1} ml="2">
                <FormControl.Label _text={{ fontSize: 12 }}>
                  Colour
                </FormControl.Label>
                <Select
                  size="2xl"
                  defaultValue="blue"
                  // selectedValue={value}
                  accessibilityLabel="Select Colour"
                  placeholder="Colour"
                  onValueChange={(itemValue) => {
                    findColour(itemValue);
                  }}
                >
                  {selectColours.map((colour, index) => (
                    <Select.Item
                      key={index}
                      label={colour.name}
                      selectedValue={colour}
                      value={colour.value}
                      bg={colour.value}
                      my={1}
                      fontSize="2xl"
                    />
                  ))}
                </Select>
                <FormControl.ErrorMessage>
                  Something is wrong.
                </FormControl.ErrorMessage>
              </FormControl>
            </Flex>

            <Button
              size="lg"
              mb="4"
              bg="blue.500"
              py="3"
              onPress={handleSubmit(addSaving)}
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
