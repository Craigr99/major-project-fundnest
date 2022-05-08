import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HamburgerIcon,
  Link,
  Text,
  View,
  Progress,
  HStack,
  Spacer,
  ScrollView,
  FlatList,
  Pressable,
  Spinner,
  Modal,
  CloseIcon,
  Menu,
  Popover,
  ChevronDownIcon,
  useDisclose,
  Center,
  Actionsheet,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getUserAccount } from "../../features/user";

const Index = ({ navigation, route }) => {
  // State
  const dispatch = useDispatch();
  const userAccountID = useSelector((state) => state.user.accountID.accountID);
  const user = useSelector((state) => state.user.value);
  const nordigenToken = useSelector(
    (state) => state.auth.nordigenToken.nordigenToken
  );
  const authToken = useSelector((state) => state.auth.authToken);
  const [accountBalance, setAccountBalance] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accountIDs, setAccountIDs] = useState([]);
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [savingsList, setSavingsList] = useState([]);
  const [currentSavingsTotal, setCurrentSavingsTotal] = useState("");
  const toast = useToast();

  useEffect(() => {
    getAccounts();
    getAccountBalance();
    getSavings();
  }, []);

  const getAccounts = () => {
    axios
      .get(`http://localhost:8000/accounts`, {
        headers: {
          Authorization: `Bearer ${authToken.authToken}`,
        },
      })
      .then((res) => {
        setUserBankAccounts(res.data.accounts);
      })
      .catch((err) => console.log(err));
  };

  const getAccountBalance = () => {
    axios
      .get(
        `https://ob.nordigen.com/api/v2/accounts/${userAccountID}/balances/`,
        {
          headers: {
            Authorization: `Bearer ${nordigenToken}`,
          },
        }
      )
      .then((res) => {
        setAccountBalance(res.data.balances[0]);
      })
      .catch((err) => console.log(err));
  };

  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken.authToken}`,
          },
        }
      )
      .then((res) => {
        navigation.navigate("Welcome");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const OptionsModal = () => {
    return (
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Go To</Modal.Header>
          <Modal.Body>
            <Flex direction="row" alignItems="center">
              <Ionicons name="person" size={22} color="#3b82f6" />
              <Text
                fontSize="md"
                ml={3}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("ProfileIndex");
                }}
              >
                Profile
              </Text>
            </Flex>
            <Flex direction="row" alignItems="center" mt={3}>
              <Ionicons name="log-out-outline" size={22} color="#3b82f6" />
              <Text
                fontSize="md"
                ml={3}
                onPress={() => {
                  setShowModal(false);
                  logoutUser();
                }}
              >
                Logout
              </Text>
            </Flex>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  };

  const selectAccount = (props) => {
    dispatch(getUserAccount({ accountID: props }));
    getAccountBalance();
    toast.show({
      title: "Account Switched",
      status: "info",
      placement: "top",
    });
  };

  const ActionSheet = () => {
    const { isOpen, onOpen, onClose } = useDisclose();
    return (
      <Center>
        <Pressable onPress={onOpen}>
          <ChevronDownIcon size={6} />
        </Pressable>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Accounts
              </Text>
            </Box>
            {userBankAccounts ? (
              userBankAccounts.map((account, index) => (
                <Actionsheet.Item
                  key={index}
                  display="flex"
                  onPress={() => {
                    selectAccount(account.account_id);
                    onClose();
                  }}
                >
                  <Text
                    color="blue.500"
                    fontWeight={500}
                    textTransform="uppercase"
                  >
                    {account.bank_name}
                  </Text>

                  <Text fontSize="xl" fontWeight={600}>
                    {account.owner_name}
                  </Text>
                  <Text>Product: {account.product}</Text>
                </Actionsheet.Item>
              ))
            ) : (
              <Actionsheet.Item>No accounts found</Actionsheet.Item>
            )}
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    );
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const getSavings = () => {
    axios
      .get("http://localhost:8000/savings/", {
        headers: {
          Authorization: `Bearer ${authToken.authToken}`,
        },
      })
      .then((res) => {
        setSavingsList(res.data.savings.slice(0, 3));
        console.log(savingsList);
        getCurrentSavingsTotal(savingsList);
        console.log("total", currentSavingsTotal);
      })
      .catch((err) => console.log(err));
  };

  const getCurrentSavingsTotal = (array) => {
    let sum = 0;
    for (var i = 0; i < array.length; i++)
      sum += parseInt(array[i].current_amount);
    setCurrentSavingsTotal(currencyFormatter(sum));
  };

  const currencyFormatter = (amount) => {
    if (!amount) return null;
    amount = parseInt(amount);
    // console.log(amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const getPercentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };

  return (
    <View bg="dark.100" h="1/2" w="full" borderBottomRadius="36">
      <SafeAreaView>
        <Box mx="8" pt="10">
          <Flex direction="row" alignItems="center">
            <Pressable onPress={() => navigation.navigate("ProfileIndex")}>
              <Avatar
                bg={stringToColor(user.name)}
                alignSelf="center"
                size="xl"
                // source={{
                //   uri: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                // }}
              >
                {user.name.split(" ")[0][0]}
              </Avatar>
            </Pressable>
            <Flex ml="6" direction="column">
              <Text fontSize="lg" color="amber.400">
                Welcome back,
              </Text>
              <Text fontSize="3xl" color="white" fontWeight={600}>
                {user.name || "John Doe"}
              </Text>
            </Flex>

            {/* Modal */}
            <Button
              mt={1}
              variant="unstyled"
              ml="auto"
              alignSelf="flex-start"
              onPress={() => {
                console.log("press");
                setShowModal(true);
              }}
            >
              {showModal ? (
                <CloseIcon size={5} color="amber.400" />
              ) : (
                <HamburgerIcon size={5} color="amber.400" />
              )}
            </Button>
          </Flex>
        </Box>

        <OptionsModal />

        {/* Instant Cash Card */}
        <Box
          mx="5"
          mt="12"
          px="6"
          py="8"
          bg="white"
          borderRadius="xl"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex direction="row" alignItems="center">
            <Box mr={2}>
              <Text fontSize="lg" fontWeight={600}>
                Instant
              </Text>
              <Text color="coolGray.500">Cash Available</Text>
            </Box>
            <ActionSheet />
            {/* <Box alignItems="center">
              <Popover
                trigger={(triggerProps) => {
                  return (
                    <Pressable {...triggerProps}>
                      <ChevronDownIcon size={6} />
                    </Pressable>
                  );
                }}
              >
                <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                  <Popover.Arrow />
                  <Popover.CloseButton />
                  <Popover.Header>Select Account</Popover.Header>
                  <Popover.Body>
                    This will remove all data relating to Alex. This action
                    cannot be reversed. Deleted data can not be recovered.
                  </Popover.Body>
                  <Popover.Footer justifyContent="flex-end">
                    <Button.Group space={2}>
                      <Button colorScheme="coolGray" variant="ghost">
                        Cancel
                      </Button>
                    </Button.Group>
                  </Popover.Footer>
                </Popover.Content>
              </Popover>
            </Box> */}
          </Flex>
          {accountBalance ? (
            <Text fontWeight={700} fontSize="xl">
              €{accountBalance.balanceAmount.amount}
            </Text>
          ) : (
            <Spinner color="amber.500" size="sm" />
          )}
        </Box>

        {/* Savings Card */}
        <Pressable onPress={() => navigation.navigate("SavingsIndex")}>
          <Box
            mx="5"
            mt="8"
            px="6"
            py="8"
            bg="white"
            borderRadius="xl"
            shadow="2"
          >
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text fontSize="lg" fontWeight={600}>
                  Savings
                </Text>
                <Text color="coolGray.500">In your savings</Text>
              </Box>
              <Text fontWeight={700} fontSize="xl">
                €{currentSavingsTotal || "0"}
              </Text>
            </Flex>
            <Flex
              mt="4"
              direction="row"
              flexWrap="wrap"
              justify="space-between"
            >
              {savingsList &&
                savingsList.map((saving, index) => (
                  <Box
                    key={index}
                    borderColor="coolGray.200"
                    borderWidth={1}
                    p="3"
                    w="48%"
                    mb={4}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate("SavingsShow", {
                          ID: saving._id,
                        })
                      }
                    >
                      <Ionicons
                        name={saving.icon}
                        size={30}
                        color={saving.icon_color}
                      />
                      <Text fontWeight={600} fontSize="md" my="3">
                        €{currencyFormatter(saving.current_amount)}/
                        <Text
                          fontWeight={200}
                          fontSize="sm"
                          color="coolGray.500"
                        >
                          €{currencyFormatter(saving.amount)}
                        </Text>
                      </Text>
                      <Progress
                        bg={saving.colour}
                        // colorScheme="emerald"
                        value={
                          getPercentage(saving.current_amount, saving.amount) ||
                          0
                        }
                        mb="5"
                      />
                    </Pressable>
                  </Box>
                ))}
              {/* Add button */}
              <Box alignSelf="center" alignItems="center" w="48%">
                <Pressable onPress={() => navigation.navigate("SavingsCreate")}>
                  <Box
                    bg="white"
                    w="68"
                    h="68"
                    borderWidth="1"
                    borderColor="coolGray.200"
                    shadow="1"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons name="add" size={32} />
                  </Box>
                </Pressable>
              </Box>
            </Flex>
          </Box>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default Index;
