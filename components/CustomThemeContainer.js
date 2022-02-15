import { NativeBaseProvider, extendTheme } from "native-base";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

const CustomThemeContainer = (props) => {
  // customizing native base theme
  const theme = extendTheme({
    fontConfig: {
      Montserrat: {
        100: {
          normal: "Montserrat_100Thin",
        },
        300: {
          normal: "Montserrat_300Light",
        },
        400: {
          normal: "Montserrat_400Regular",
        },
        500: {
          normal: "Montserrat_500Medium",
        },
        600: {
          normal: "Montserrat_600SemiBold",
        },
        700: {
          normal: "Montserrat_700Bold",
        },
      },
    },

    fonts: {
      heading: "Montserrat",
      body: "Montserrat",
      mono: "Montserrat",
    },
  });

  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
  );
};

export default CustomThemeContainer;
