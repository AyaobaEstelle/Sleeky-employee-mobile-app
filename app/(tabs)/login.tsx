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
        <Link href="/employees/employee-form">
          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </Link>
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
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "poppins-medium",
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
    fontFamily: "poppins-light",
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
    fontFamily: "poppins-bold",
  },
  footerText: {
    color: "#000",
    textAlign: "center",
    marginTop: 15,
    fontFamily: "poppins-light",
  },
});
