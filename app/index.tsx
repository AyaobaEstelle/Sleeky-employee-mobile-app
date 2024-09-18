import { Link, Stack, useNavigation } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { useEffect } from "react";

export default function WelcomePage() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Colors.background,
          height: "100%",
          width: "100%",
        }}
      >
        <ImageBackground
          style={{ height: Dimensions.get("window").height / 2 }}
          resizeMode="contain"
          source={require("../assets/images/welcome-img1.jpg")}
        />
        <View>
          <View
            style={{
              paddingTop: Spacing,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xxLarge,
                fontFamily: "PoppinsBold",
                color: Colors.primary,
                paddingHorizontal: Spacing * 2,
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              welcome to sleeky programmers
            </Text>
            <Text
              style={{
                fontSize: FontSize.medium,
                fontFamily: "PoppinsMedium",
                color: Colors.text,
                textAlign: "center",
                textTransform: "capitalize",
                marginTop: Spacing * 2,
              }}
            >
              Manage employees data from here
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: Spacing * 2,
              paddingTop: Spacing * 6,
              flexDirection: "row",
            }}
          >
            <Pressable
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
              }}
            >
              <Text
                style={{
                  color: Colors.secondary,
                  fontSize: FontSize.large,
                  textAlign: "center",
                  fontFamily: "PoppinsBold",
                }}
              >
                <Link href="/sign-up">Sign Up</Link>
              </Text>
            </Pressable>
            <Pressable
              style={{
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
              }}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontSize: FontSize.large,
                  textAlign: "center",
                  fontFamily: "PoppinsBold",
                }}
              >
                <Link href="/login">Login</Link>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
