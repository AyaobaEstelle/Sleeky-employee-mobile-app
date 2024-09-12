import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="employeeForm"
        options={{
          title: "Employee Form",
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="employeeDetails"
        options={{
          title: "Employee Details",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
