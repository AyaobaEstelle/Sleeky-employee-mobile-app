import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import useSWR from "swr";

import { Employee } from "@/lib/types";
import SingleEmployee from "@/components/SingleEmployee";

const Index = () => {
  const pathname = useLocalSearchParams();

  const { data, isLoading,error } = useSWR(
    // Fetch individual employee
    "https://employee-management-api-xj3a.onrender.com/employees/" +
      pathname.id,
    async (url) => {
      const access_token = await AsyncStorage.getItem("token");
      const data = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });

      return data?.data as Employee;
    }
  );
  if(error)
    return (
    <View>
      <Text>Error, Can't View Employee Detail...</Text>
    </View>
  );
  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return <SingleEmployee employeeData={data as Employee} />;
};

export default Index;
