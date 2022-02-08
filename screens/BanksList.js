import {
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  NativeBaseProvider,
  Box,
  ScrollView,
  Text,
  Divider,
} from "native-base";

const BanksList = ({ navigation }) => {
  const { token } = useSelector((state) => state.auth.value);

  const [banksList, setBanksList] = useState([]);

  useEffect(() => {
    getBanks();
  }, [banksList]);

  const getBanks = () => {
    axios
      .get("https://ob.nordigen.com/api/v2/institutions/?country=ie", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBanksList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const selectBank = (props) => {
    console.log("selected", props);
    navigation.navigate("UserAgreement", {
      name: props.name,
      id: props.id,
    });
  };

  return (
    <NativeBaseProvider>
      <Box bg="trueGray.300">
        <Box mx="10" my="24">
          <ScrollView bg="white" p="8" borderRadius="md" border="1">
            <Text fontSize="2xl" fontWeight="medium" mb="8">
              Select your bank:
            </Text>
            {banksList ? (
              banksList.map((bank, index) => (
                <Box key={index}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => selectBank(bank)}
                  >
                    <Image
                      style={{ width: 48, height: 48 }}
                      source={{ uri: bank.logo }}
                    />
                    <Text ml="3">{bank.name}</Text>
                  </TouchableOpacity>
                  <Divider my="4" />
                </Box>
              ))
            ) : (
              <View>
                <Text>No banks found</Text>
              </View>
            )}
          </ScrollView>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default BanksList;