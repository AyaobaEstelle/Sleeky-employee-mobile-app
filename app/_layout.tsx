import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlayFairBold: require("../assets/fonts/PlayFair-Display.Bold.ttf"),
    PlayFairBlack: require("../assets/fonts/PlayFair-Display.Black.ttf"),
    PlayFairRegular: require("../assets/fonts/PlayFair-Display.Regular.ttf"),
    PlayFairItalic: require("../assets/fonts/PlayFair-Display.Italic.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error in useEffect ===============", error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <RootSiblingParent>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </RootSiblingParent>
  );
}
