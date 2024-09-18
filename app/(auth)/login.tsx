import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function Login() {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.background,
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              fontFamily: "PoppinsBold",
              color: Colors.primary,
              paddingTop: Spacing * 4,
              paddingBottom: Spacing,
              textTransform: "capitalize",
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              fontSize: FontSize.large,
              fontFamily: "PoppinsLight",
              textAlign: "center",
            }}
          >
            Welcome back!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 4,
          }}
        >
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
                borderRadius: Spacing,
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
                borderRadius: Spacing,
                marginVertical: Spacing,
              },
              focused && {
                borderWidth: 1.5,
                borderColor: Colors.primary,
              },
            ]}
          />
        </View>
        <Pressable
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
          }}
        >
          <Text
            style={{
              color: Colors.secondary,
              fontFamily: "PoppinsBold",
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            <Link href="/(tabs)/employee-form">Login</Link>
          </Text>
        </Pressable>
        <Pressable
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
              fontFamily: "PoppinsLight",
            }}
          >
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

const styles = StyleSheet.create({});
