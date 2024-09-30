import { StyleSheet } from "react-native";
import { Tabs, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 50,
          backgroundColor: "white",
        },
        tabBarActiveBackgroundColor: Colors.active,
        tabBarActiveTintColor: Colors.lightsecondary,
        tabBarLabelStyle: {
          fontSize: 15,
          paddingBottom: 5,
        },
        tabBarInactiveTintColor: Colors.darkText,
      }}
    >
      <Tabs.Screen
        name="welcome-page"
        options={{
          title: "  Welcome Page",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#fff" : "#00000"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="employee-form"
        options={{
          title: "Employee Form",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={24}
              color={focused ? "#fff" : "#00000"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="employee-list"
        options={{
          title: "Employee List",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={24}
              color={focused ? "#fff" : "#00000"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
