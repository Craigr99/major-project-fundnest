import { Button, Image, SafeAreaView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? 60 : 0,
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
