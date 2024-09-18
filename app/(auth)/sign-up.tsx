import { SafeAreaView, Text, TextInput, Pressable, View } from "react-native";
import React, { useState } from "react";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import { Link } from "expo-router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type SignupProps = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function Signup({ navigation }: SignupProps) {
  const [focused, setFocused] = useState<boolean>(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });
  };
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
              fontSize: FontSize.xLarge,
              fontFamily: "PoppinsBold",
              color: Colors.primary,
              paddingTop: Spacing * 4,
              paddingBottom: Spacing,
              textTransform: "capitalize",
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              fontSize: FontSize.small,
              fontFamily: "PoppinsLight",
              textAlign: "center",
              // textTransform: "capitalize",
            }}
          >
            Create an account to view all employees
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <TextInput
            placeholder="Full name"
            value={form.fullName}
            onChangeText={(value) => handleChange("fullName", value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
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
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => handleChange("email", value)}
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
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
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
              textAlign: "center",
              fontSize: FontSize.large,
              fontFamily: "PoppinsBold",
            }}
          >
            Sign up
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
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "blue",
              }}
            >
              Login
            </Link>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
