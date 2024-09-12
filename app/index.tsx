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
        <Pressable>
          <Text style={styles.homeButtonText}>
            <Link href="/(auth)/sign-up">Add Employee</Link>
          </Text>
        </Pressable>

        <Pressable>
          <Text style={styles.homeButtonText}>
            <Link href="/#">View Employees</Link>
          </Text>
        </Pressable>
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
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "PoppinsBold",
  },
  subHeadingText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "PoppinsMedium",
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  homeButtonText: {
    borderRadius: 7,
    padding: 13,
    color: "white",
    backgroundColor: "black",
    fontSize: 16,
    fontFamily: "PoppingsLight",
  },
});
