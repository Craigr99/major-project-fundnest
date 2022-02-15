import axios from "axios";
import { useState, useCallback } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useSelector } from "react-redux";

const UserAgreement = ({ navigation, route }) => {
  const [agreementId, setAgreementId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { nordigenToken } = useSelector((state) => state.auth.nordigenToken);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // on refresh screen
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      console.log("refreshed!!", agreementId);
      console.log(nordigenToken);
      axios
        .get(`https://ob.nordigen.com/api/v2/requisitions/${agreementId}/`, {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        })
        .then((res) => {
          console.log("accounts", res.data.accounts);
          navigation.navigate("ListAccounts", {
            accounts: res.data.accounts,
          });
        })
        .catch((err) => console.log(err));
      setRefreshing(false);
    });
  }, [agreementId]);

  const createAgreement = () => {
    axios
      .post(
        "https://ob.nordigen.com/api/v2/agreements/enduser/",
        {
          // institution_id: route.params.id,
          institution_id: "SANDBOXFINANCE_SFIN0000", // test bank
        },
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then(() => {
        axios
          .post(
            "https://ob.nordigen.com/api/v2/requisitions/",
            {
              redirect: "https://keen-bohr-87e0df.netlify.app/",
              // institution_id: route.params.id,
              institution_id: "SANDBOXFINANCE_SFIN0000", // test bank
            },
            {
              headers: {
                Authorization: `Bearer ${nordigenToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data.id);
            setAgreementId(res.data.id);
            let result = WebBrowser.openBrowserAsync(
              res.data.link
              // "https://ob.nordigen.com/psd2/start/2be17da5-2b1e-4001-91f9-f4b22b570096/SANDBOXFINANCE_SFIN0000"
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "android" ? 60 : 0,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>You Have Selected: {route.params.name}</Text>
        <Text>As an end user you agree and accept the following:</Text>

        <Button title="Agree" onPress={createAgreement} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default UserAgreement;
