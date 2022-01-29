import axios from "axios";
import { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

const UserAgreement = ({ navigation, route }) => {
  const [agreementId, setAgreementId] = useState("");

  const createAgreement = () => {
    axios
      .post(
        "https://ob.nordigen.com/api/v2/agreements/enduser/",
        {
          institution_id: route.params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        }
      )
      .then((res) => setAgreementId(res.data.id))
      .then(() => {
        axios
          .post(
            "https://ob.nordigen.com/api/v2/requisitions/",
            {
              redirect: "http://127.0.0.1:5500/backend/index.html",
              institution_id: route.params.id,
              // institution_id: "SANDBOXFINANCE_SFIN0000",
            },
            {
              headers: {
                Authorization: `Bearer ${route.params.token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            let result = WebBrowser.openBrowserAsync(
              // res.data.link
              "https://ob.nordigen.com/psd2/start/2be17da5-2b1e-4001-91f9-f4b22b570096/SANDBOXFINANCE_SFIN0000"
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView>
      <Text>You Have Selected: {route.params.name}</Text>
      <Text>As an end user you agree and accept the following:</Text>

      <Button title="Agree" onPress={createAgreement} />
    </SafeAreaView>
  );
};

export default UserAgreement;
