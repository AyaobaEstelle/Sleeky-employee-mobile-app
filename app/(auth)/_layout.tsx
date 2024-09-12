import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
      <Tabs.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="sign-in" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <AntDesign name="login" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
