import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { Link, useNavigation, router } from "expo-router";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user_login } from "../api/user_api";

interface Iform {
  email?: string;
  password?: string;
}

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [focused, setFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Iform>({});
  const [showToast, setShowToast] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastDuration = 2000;

  useEffect(() => {
    const x = async () => {
      const dataToken = await AsyncStorage.getItem("AccessToken");
      console.log("🚀 ~ x ~ dataToken:", dataToken);
    };
    x();
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    if (!dataToken) {
      navigation.navigate("login");
    } else {
      navigation.navigate("(tabs)", { screen: "welcome-page" });
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, toastDuration);
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
        const result = response.data;
        const a = await AsyncStorage.setItem("token", result.accessToken);
        console.log("🚀 ~ submit ~ a:", a);
        router.push("/(tabs)/welcome-page");
      } catch (error) {
        setError("Failed to create account");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("form is invalid");
    }
  };

  // const submit = async () => {
  //   if (validateForm()) {
  //     console.log("form is valid");
  //     user_login({
  //       email: form.email,
  //       password: form.password,
  //     }).then((result) => {
  //       console.log(result);
  //       if (result.status == 200) {
  //         AsyncStorage.setItem("AccessToken", result.data.token);
  //         navigation.navigate("/(tabs)/welcome-page");
  //       }
  //     });
  //   } else {
  //     alert(errors);
  //   }
  // };

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <SafeAreaView
      style={{
        position: "relative",
      }}
    >
      {showToast && (
        <View style={styles.toast}>
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            {toastMessage}
          </Text>
        </View>
      )}
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
            onChangeText={(email: string) => {
              setForm({ ...form, email });
            }}
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
          <Text
            style={{
              color: "red",
              marginTop: 1,
              fontSize: 12,
            }}
          >
            {errors.email && "email is required"}
          </Text>
          <TextInput
            placeholder="Password"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
            secureTextEntry={true}
            onChangeText={(password: string) => {
              setForm({ ...form, password });
            }}
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
          <Text
            style={{
              color: "red",
              marginTop: 1,
              fontSize: 12,
            }}
          >
            {errors.password && "Password is required"}
          </Text>
        </View>
        <Pressable onPress={() => submit()} style={styles.buttonView}>
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Login"}
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
  toast: {
    backgroundColor: "#F44336",
    color: "white",
    padding: 2,
    position: "absolute",
    zIndex: 10000,
    height: 50,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
    width: "70%",
    top: 5,
    right: 0,
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
