import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { SetStateAction, useState } from "react";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { Link, useNavigation } from "expo-router";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [focused, setFocused] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<string | undefined>();

  const handleLogin = (credentials: { email: string; password: string }) => {
    const url = "https://employee-management-api-xj3a.onrender.com/auth/login";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("welcome", { ...data[0] });
        }
      })
      .catch((error) => {
        console.log(error.JSON());
        handleMessage("An error occurred while trying to login.");
      });
  };

  const handleMessage = (message: string, type = "FAILED") => {
    setMessage((prevMessage) => message);
    setMessageType(type);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Login here</Text>
          <Text style={styles.headerSubText}>Welcome back!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
            keyboardType="email-address"
            style={[
              {
                fontSize: FontSize.small,
                fontFamily: "PoppinsRegular",
                padding: Spacing * 2,
                backgroundColor: Colors.lightsecondary,
                marginVertical: Spacing,
              },
              focused && {
                borderWidth: 1.5,
                borderColor: Colors.primary,
              },
            ]}
          />
          <TextInput
            placeholder="Password"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
            secureTextEntry={true}
            style={[
              {
                fontSize: FontSize.small,
                fontFamily: "PoppinsRegular",
                padding: Spacing * 2,
                backgroundColor: Colors.lightsecondary,
                marginVertical: Spacing,
              },
              focused && {
                borderWidth: 1.5,
                borderColor: Colors.primary,
              },
            ]}
          />
        </View>
        <Pressable style={styles.buttonView}>
          <Text style={styles.buttonText}>
            <Link href="/(tabs)/employee-form">Login</Link>
          </Text>
        </Pressable>
        <Pressable style={styles.footer}>
          <Text style={styles.footerText}>
            Create new account{" "}
            <Link
              href="/sign-up"
              style={{
                color: "blue",
                textDecorationLine: "underline",
              }}
            >
              here
            </Link>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2,
    backgroundColor: Colors.background,
    height: "100%",
  },
  headerView: {
    alignItems: "center",
  },
  headerText: {
    fontSize: FontSize.xxLarge,
    fontFamily: "PoppinsBold",
    color: Colors.primary,
    paddingTop: Spacing * 4,
    paddingBottom: Spacing,
    textTransform: "capitalize",
  },
  headerSubText: {
    fontSize: FontSize.large,
    fontFamily: "PoppinsLight",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: Spacing * 4,
  },
  buttonView: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
  },
  buttonText: {
    color: Colors.secondary,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    fontSize: FontSize.large,
  },
  footer: {
    padding: Spacing,
  },
  footerText: {
    color: Colors.text,
    textAlign: "center",
    fontSize: FontSize.small,
    fontFamily: "PoppinsLight",
  },
  // messageBox: {
  //   position: "absolute",
  //   bottom: 0,
  //   width: "100%",
  //   padding: Spacing,
  //   backgroundColor: "white",
  //   borderTopWidth: 1,
  //   borderTopColor: "#E6E6E6",
  //   zIndex: 100,
  //   color: $((props) => (props.type == "SUCCESS" ? green : red)));
  // }
});
