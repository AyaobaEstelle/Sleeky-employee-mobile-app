import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchEmployees } from "@/lib/createEmployee";
import useSWRMutation from "swr/mutation";
import { Employee } from "@/lib/types";
import { useEffect } from "react";
import { Link } from "expo-router";

export default function EmployeeList() {
  const {
    data,
    trigger,
    isMutating: isLoading,
  } = useSWRMutation(
    "https://employee-management-api-xj3a.onrender.com/employees",
    fetchEmployees
  );

  useEffect(() => {
    const handleTrigger = async () => {
      await trigger();
    };
    handleTrigger();
    console.log(data, "data");
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Employee List</Text>
        <View>
          {isLoading ? (
            <Text>...Loading</Text>
          ) : (
            <View>
              {data?.map((employee: Employee) => (
                <View style={styles.itemContainer}>
                  <View style={styles.nameText}>
                    <Text>{employee._id}</Text>
                    <Text style={styles.nameText}>
                      {employee.firstName}
                      {employee.lastName}
                    </Text>
                    <Text style={styles.emailText}>
                      {employee.emailAddress}
                    </Text>
                    <Text style={styles.roleText}>
                      {employee.employmentRole}
                    </Text>
                    <Pressable style={styles.button}>
                      <Text style={styles.buttonText}>
                        <Link
                          href={`/employee/${employee._id}` }
                        >
                          View Employee Details
                        </Link>
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  idText: {
    fontSize: 14,
    color: "#888",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 4,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  roleText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
