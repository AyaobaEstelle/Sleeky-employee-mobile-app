import { Link } from "expo-router";
import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.subHeader}>
          Enter your information to log into your account
        </Text>
        <TextInput
          style={styles.input}
          placeholder="sleeky@example.com"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="*********"
          secureTextEntry={true}
          placeholderTextColor="#555"
        />

        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>
            <Link href="/employee-form">Login</Link>
          </Text>
        </Pressable>

        <View>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Link href="/sign-up" style={{ color: "blue" }}>
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "ffff",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "PoppinsMedium",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#000",
    marginBottom: 15,
    fontFamily: "PoppinsLight",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
  },
  footerText: {
    color: "#000",
    textAlign: "center",
    marginTop: 15,
    fontFamily: "PoppinsLight",
  },
});
