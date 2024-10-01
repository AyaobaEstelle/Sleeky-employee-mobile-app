import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { Href, Link, router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Iform {
  email?: string;
  password?: string;
}

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [focused, setFocused] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Iform>({ email: "", password: "" });
  const [form, setForm] = useState({ email: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState<string | undefined>();

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const handleToastPress = () => {
    setShowToast(false);
  };

  useEffect(() => {
    if (toastMessage) {
      handleShowToast();
    }
  }, [toastMessage]);

  const validateForm = () => {
    let formErrors = {} as Iform;
    if (!form.email) formErrors.email = "Invalid email";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      formErrors.email = "Invalid email";

    if (!form.password) formErrors.password = "Invalid password";
    else if (form.password.length < 6)
      formErrors.password = "Password must be at least 6 characters";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const submit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://employee-management-api-xj3a.onrender.com/auth/login",
          form
        );
        const result = response.data as { _id: string; accessToken: string };
        const a = await AsyncStorage.setItem("token", result.accessToken);
        console.log("🚀 ~ submit ~ a:", result);
        router.push("/(tabs)/welcome-page/" as Href);
      } catch (error) {
        console.log("error :", error);

        setError("Failed to create account");
      } finally {
        setIsLoading(false);
        setToastMessage("Account does not exist");
      }
    } else {
      console.log("form is invalid");
    }
  };

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });
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
            onChangeText={(text) => handleChange("email", text)}
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
          <>
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
          </>
          <TextInput
            placeholder="Password"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={(text) => handleChange("password", text)}
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
          <View>
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
          </View>
        </View>
        <Pressable
          style={isLoading ? styles.loadingButtonView : styles.buttonView}
          onPress={submit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loggin in" : "Login"}
            {/* <Link href="/(tabs)/employee-form">Login</Link> */}
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
    width: "100%",
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
  loadingButtonView: {
    padding: Spacing * 2,
    backgroundColor: Colors.gray,
    marginVertical: Spacing * 3,
  },
  buttonText: {
    color: Colors.secondary,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    fontSize: FontSize.large,
  },
  loadingButtonText: {
    color: Colors.gray,
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
