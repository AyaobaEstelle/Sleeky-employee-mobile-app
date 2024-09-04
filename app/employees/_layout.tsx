import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack, Tabs } from "expo-router";

export default function EmployeeLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
      <Tabs.Screen
        name="employeeForm"
        options={{
          title: "Employee Form",
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
