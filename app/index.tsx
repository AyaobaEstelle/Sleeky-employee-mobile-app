import { Link, Stack, useNavigation } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Welcome",
          headerStyle: { backgroundColor: "#45484A" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text style={styles.headingText}>Sleeky Programmers</Text>
      <Text style={styles.subHeadingText}>Employee Details</Text>
      <View style={styles.homeButton}>
        <Link href="/(tabs)/sign-up">
          <Pressable style={styles.homeButtonText}>Add Employee</Pressable>
        </Link>
        <Link href="/#">
          <Pressable style={styles.homeButtonText}>View Employees</Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "poppins-bold",
  },
  subHeadingText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "poppins-medium",
  },
  homeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    gap: 30,
  },
  homeButtonText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#45484A",
    padding: 12,
    backgroundColor: "#45484A",
    color: "white",
    fontWeight: "bold",
    fontFamily: "poppins-light",
  },
});
