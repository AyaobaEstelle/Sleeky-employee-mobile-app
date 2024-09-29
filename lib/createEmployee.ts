import AsyncStorage from "@react-native-async-storage/async-storage";
import { Employee } from "./types";
import { formSchema } from "./formConfig";

export const fetchEmployees = async (url: string | URL | Request) => {
  const accessToken = await AsyncStorage.getItem("token");
const response = await fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

if (!response.ok) {
  console.log("Failed to get employees");
}

const data = await response.json();
return data;
};

export const createEmployee = async (
    url: string | URL | Request,
    { arg }: { arg: Employee }
  ) => {
    const value = await AsyncStorage.getItem("token");
  console.log(value,'value')
    // return;
    const parsedFormData = formSchema.parse(arg);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
      body: JSON.stringify(parsedFormData),
    });
  
    const data = await response.json();
    return data;
  };