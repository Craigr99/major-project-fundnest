import axios from "axios";
import { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, RefreshControl } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  Button,
  Center,
  VStack,
  Heading,
  Image,
} from "native-base";

const UserAgreement = ({ navigation, route }) => {
  const [agreementId, setAgreementId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);

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
            setProcessComplete(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View alignItems="center" mt="5" mx="8">
          <View
            alignItems="center"
            style={{
              display: processComplete ? "none" : "block",
            }}
          >
            <Text fontSize="xl">
              You Have Selected:{" "}
              <Text fontFamily="body" fontWeight={600}>
                {route.params.name}
              </Text>
            </Text>
            <Text mt="3" mb="2" fontSize="md" textAlign="center">
              As an end user you agree and accept the following:
            </Text>
            <Text fontSize="md">
              This application will receive access to your:
            </Text>
            <VStack space={2} alignItems="center" mt={2} mb={4}>
              <Text fontWeight={600}>• Balances</Text>
              <Text fontWeight={600}>• Account Details</Text>
              <Text fontWeight={600}>• Transactions</Text>
              <Text fontWeight={600}>
                • Account Information scope for 90 days
              </Text>
              <Text fontWeight={600}>• Account access valid for 90 days</Text>
            </VStack>

            <Button onPress={createAgreement} bg="blue.500">
              Agree
            </Button>
          </View>
          {processComplete ? (
            <>
              <Heading>Please Refresh The Screen</Heading>
              <Image
                source={{
                  uri: "https://docs.microsoft.com/en-us/windows/apps/design/controls/images/pull-to-refresh.gif",
                }}
                w="300"
                h="400"
                alt="gif"
              />
            </>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAgreement;
