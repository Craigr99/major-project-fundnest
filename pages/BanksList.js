import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

const BanksList = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [banksList, setBanksList] = useState([]);

  useEffect(() => {
    getToken();
  }, [banksList, token]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token !== null) {
        // value exists
        setToken(token);
        // run get banks function after token is stored
        getBanks();
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

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
      token: token,
    });
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 32, marginTop: 28 }}>List of banks</Text>
      <View>
        {banksList ? (
          banksList.map((bank, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: bank.logo }}
                />
                <Text>{bank.name}</Text>
                <Button title="Select" onPress={() => selectBank(bank)} />
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text>No banks found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BanksList;
