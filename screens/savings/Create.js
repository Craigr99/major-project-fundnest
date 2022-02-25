import { Link } from "@react-navigation/native";
import axios from "axios";
import {
  Box,
  Button,
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

const Create = ({ navigation }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [icon, setIcon] = useState("plane");
  const [colour, setColor] = useState("blue");

  const authToken = useSelector((state) => state.auth.authToken);

  const AddSaving = () => {
    axios
      .post(
        "http://localhost:8000/savings/",
        {
          name: name,
          amount: amount,
          icon: icon,
          colour: colour,
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
  return (
    <View flex={1} backgroundColor="white">
      <SafeAreaView>
        <Box mx="8" mt="6">
          <Stack space={6}>
            <FormControl isRequired>
              <FormControl.Label _text={{ fontSize: 12 }}>
                Goal Name
              </FormControl.Label>
              <Input
                type="text"
                size="2xl"
                variant="outline"
                rounded="lg"
                onChangeText={(newText) => setName(newText)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label _text={{ fontSize: 12 }}>
                Amount
              </FormControl.Label>
              <Input
                type="text"
                size="2xl"
                variant="outline"
                rounded="lg"
                onChangeText={(newText) => setAmount(newText)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </FormControl>

            <Flex direction="row" justifyContent="space-between">
              <FormControl flex={1} mr="2">
                <FormControl.Label _text={{ fontSize: 12 }}>
                  Icon
                </FormControl.Label>
                <Select
                  size="2xl"
                  defaultValue="i1"
                  // selectedValue={value}
                  accessibilityLabel="Select Icon"
                  placeholder="Icon"
                  onValueChange={(itemValue) => {
                    setIcon(itemValue);
                  }}
                  // _selectedItem={{
                  //   bg: "teal.600",
                  //   endIcon: <CheckIcon size={5} />,
                  // }}
                >
                  <Select.Item label="Icon1" value="i1" />
                  <Select.Item label="Icon2" value="i2" />
                  <Select.Item label="Icon3" value="i3" />
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
                    setColor(itemValue);
                  }}
                  // _selectedItem={{
                  //   bg: "teal.600",
                  //   endIcon: <CheckIcon size={5} />,
                  // }}
                >
                  <Select.Item label="Blue" value="blue" />
                  <Select.Item label="Colour1" value="color1" />
                </Select>
                <FormControl.ErrorMessage>
                  Something is wrong.
                </FormControl.ErrorMessage>
              </FormControl>
            </Flex>

            <Button size="lg" mb="4" bg="blue.500" py="3" onPress={AddSaving}>
              Add
            </Button>
          </Stack>
        </Box>
      </SafeAreaView>
    </View>
  );
};

export default Create;