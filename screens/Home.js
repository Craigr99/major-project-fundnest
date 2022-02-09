import { Text } from "react-native";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.value);

  return <Text>Welcome home {user.name}</Text>;
};

export default Home;
