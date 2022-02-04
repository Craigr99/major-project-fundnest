import axios from "axios";
import { Button, SafeAreaView, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../features/auth";

const SECRET_ID = "4bd50407-2893-45cc-aa67-e5cca02fb0db";
const SECRET_KEY =
  "c3fa951ad29d76a5425e77184cb824df753bc0c352b561b53d6dcaec83b95d20ba1fb491406b4fdaf975578eb9f9f23f1a85ba767313c1a7793b4b109fe50297";

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();

  const getToken = () => {
    axios
      .post("https://ob.nordigen.com/api/v2/token/new/", {
        secret_id: SECRET_ID,
        secret_key: SECRET_KEY,
      })
      .then((res) => {
        dispatch(setAuthToken({ token: res.data.access }));
        navigation.navigate("BanksList");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to The App!</Text>
      <Button title="Get Auth Token" onPress={getToken} />
    </SafeAreaView>
  );
};

export default Welcome;
