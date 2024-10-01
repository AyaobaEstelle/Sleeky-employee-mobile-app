import CustomeDatePicker from "@/components/CustomeDatePicker";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import Toast from "react-native-root-toast";
import { createEmployee } from "@/lib/createEmployee";
import { Employee } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Card, Title } from "react-native-paper";
import useSWRMutation from "swr/mutation";
import { router } from "expo-router";

export default function SingleEmployee({
  employeeData,
}: {
  employeeData: Employee;
}) {
  const [education, setEducation] = useState("");
  const [formSubmitType, setFormSubmitType] = useState<
    "update" | "delete" | string
  >("");
  const [gender, setGender] = useState("");

  const { trigger, isMutating: isLoading } = useSWRMutation(
    "https://employee-management-api-xj3a.onrender.com/employees/" +
      employeeData?._id,
    async (
      url,
      data: {
        arg: Employee & {
          type: "update" | "delete";
        };
      }
    ) => {
      const access_token = await AsyncStorage.getItem("token");

      //   Update Employee Details
      if (data?.arg?.type == "update") {
        const res = await axios.put(url, data?.arg, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });

        Toast.show("Employee Details Updated Successfully");
        return res;
      }

      const res = await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });

      Toast.show("Employee Details Deleted Successfully", {
        onHidden() {
          router.push("/employee-list");
        },
      });
      return res;
    }
  );
  const [formData, setFormData] = useState<Employee>({
    _id: "",
    firstName: "",
    lastName: "",
    gender: "",
    emailAddress: "",
    physicalAddress: "",
    phoneNumber: "",
    emergencyPhoneNumber: "",
    bankName: "",
    bankAccountNumber: "",
    accountName: "",
    nextOfKinFullName: "",
    nextOfKinPhoneNumber: "",
    nextOfKinRelationship: "",
    employmentRole: "",
    employmentStartDate: "",
    dateOfBirth: "",
    educationalLevel: "",
  });

  useEffect(() => {
    if (!employeeData) return;

    setFormData({
      _id: employeeData._id,
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      gender: employeeData.gender,
      emailAddress: employeeData.emailAddress,
      physicalAddress: employeeData.physicalAddress,
      phoneNumber: employeeData.phoneNumber.toString().replace("+234", ""),
      emergencyPhoneNumber: employeeData.emergencyPhoneNumber
        .toString()
        .replace("+234", ""),
      bankName: employeeData.bankName,
      bankAccountNumber: employeeData.bankAccountNumber.toString(),
      accountName: employeeData.accountName,
      nextOfKinFullName: employeeData.nextOfKinFullName,
      nextOfKinPhoneNumber: employeeData.nextOfKinPhoneNumber
        .toString()
        .replace("+234", ""),
      nextOfKinRelationship: employeeData.nextOfKinRelationship,
      employmentRole: employeeData.employmentRole,
      employmentStartDate: dayjs(employeeData.employmentStartDate).format(
        "YYYY-MM-DD"
      ),
      dateOfBirth: dayjs(employeeData.dateOfBirth).format("YYYY-MM-DD"),
      educationalLevel: employeeData.educationalLevel,
    });
  }, [employeeData]);

  const handleSubmitForm = async (type: "update" | "delete") => {
    setFormSubmitType(type);
    trigger({
      ...formData,
      type,
      nextOfKinPhoneNumber: `+234${Number(formData.nextOfKinPhoneNumber)}`,
      emergencyPhoneNumber: `+234${Number(formData.emergencyPhoneNumber)}`,
      phoneNumber: `+234${Number(formData.phoneNumber)}`,
      bankAccountNumber: Number(formData.bankAccountNumber),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.header}>Sleeky Programmers</Title>
            <Text style={styles.subheading}>employee biodata</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                placeholder="Enter first name"
                onChangeText={(string) =>
                  setFormData({ ...formData, firstName: string })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                placeholder="Enter last name"
                onChangeText={(string) =>
                  setFormData({ ...formData, lastName: string })
                }
              />
            </View>
            <View>
              <Picker
                style={styles.inputPicker}
                selectedValue={gender}
                onValueChange={(currentGender) => {
                  setGender(currentGender);
                  setFormData({
                    ...formData,
                    gender: currentGender,
                  });
                }}
              >
                <Picker.Item label="MALE" value="MALE" />
                <Picker.Item label="FEMALE" value="FEMALE" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.emailAddress}
                placeholder="Enter email"
                keyboardType="email-address"
                onChangeText={(email) =>
                  setFormData({ ...formData, emailAddress: email })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>physicalAddress</Text>
              <TextInput
                style={styles.input}
                value={formData.physicalAddress}
                placeholder="Enter house address"
                onChangeText={(physicalAddr) =>
                  setFormData({ ...formData, physicalAddress: physicalAddr })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                onChangeText={(phone) =>
                  setFormData({ ...formData, phoneNumber: phone })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Emergency Contact Number</Text>
              <TextInput
                style={styles.input}
                value={formData.emergencyPhoneNumber}
                placeholder="Enter emergency contact"
                keyboardType="phone-pad"
                onChangeText={(emergencyNum) =>
                  setFormData({
                    ...formData,
                    emergencyPhoneNumber: emergencyNum,
                  })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bank Name</Text>
              <TextInput
                style={styles.input}
                value={formData.bankName}
                placeholder="Enter bank name"
                onChangeText={(bankName) =>
                  setFormData({ ...formData, bankName })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bank Account Number</Text>
              <TextInput
                style={styles.input}
                value={`${formData.bankAccountNumber}`}
                placeholder="Enter account number"
                keyboardType="numeric"
                onChangeText={(bankAccountNumber) =>
                  setFormData({
                    ...formData,
                    bankAccountNumber,
                  })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account Name</Text>
              <TextInput
                style={styles.input}
                value={formData.accountName}
                placeholder="Enter account name"
                onChangeText={(accountName) =>
                  setFormData({ ...formData, accountName })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Next of Kin</Text>
              <TextInput
                style={styles.input}
                value={formData.nextOfKinFullName}
                placeholder="Enter next of kin name"
                onChangeText={(string) =>
                  setFormData({ ...formData, nextOfKinFullName: string })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Next of Kin Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.nextOfKinPhoneNumber}
                placeholder="Enter next of kin number"
                keyboardType="phone-pad"
                onChangeText={(string) =>
                  setFormData({ ...formData, nextOfKinPhoneNumber: string })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}> Next of Kin Relationship</Text>
              <TextInput
                style={styles.input}
                value={formData.nextOfKinRelationship}
                placeholder="Enter next of kin relationship"
                onChangeText={(string) =>
                  setFormData({ ...formData, nextOfKinRelationship: string })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Role</Text>
              <TextInput
                style={styles.input}
                value={formData.employmentRole}
                placeholder="Enter Role"
                onChangeText={(string) =>
                  setFormData({ ...formData, employmentRole: string })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Start Date</Text>
              <CustomeDatePicker
                date={formData.employmentStartDate}
                style={styles.input}
                onChange={(date) => {
                  setFormData({ ...formData, employmentStartDate: date });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <CustomeDatePicker
                date={formData.dateOfBirth}
                style={styles.input}
                onChange={(date) => {
                  setFormData({ ...formData, dateOfBirth: date });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Educational Level</Text>
              <Picker
                style={styles.inputPicker}
                selectedValue={education}
                // checkedValue={formData.educationalLevel}
                onValueChange={(currentEducation: string) => {
                  setEducation(currentEducation);
                  setFormData({
                    ...formData,
                    educationalLevel: currentEducation,
                  });
                }}
              >
                <Picker.Item label="High School" value="highschool" />
                <Picker.Item label="ND" value="nd" />
                <Picker.Item label="HND" value="hnd" />
                <Picker.Item label="Bachelor's Degree" value="bachelor" />
                <Picker.Item label="Master's Degree" value="master" />
                <Picker.Item label="Doctorate" value="doctorate" />
              </Picker>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.updateButton}
                onPress={() => handleSubmitForm("update")}
                disabled={isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading && formSubmitType == "update"
                    ? "Updating..."
                    : "Update"}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  ...styles.deleteButton,
                  borderWidth: 1,
                  borderColor: Colors.active,
                }}
                disabled={isLoading}
                onPress={() => handleSubmitForm("delete")}
              >
                <Text
                  style={{
                    ...styles.submitButtonText,
                    color: Colors.darkText,
                  }}
                >
                  {isLoading && formSubmitType == "delete"
                    ? "Deleting..."
                    : "Delete"}
                </Text>
              </Pressable>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "space-between",
    // flexDirection:'row'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 5,
    color: "#000",
    fontFamily: "PoppinsBold",
  },
  subheading: {
    textAlign: "center",
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
    textTransform: "capitalize",
    fontFamily: "PoppinsMedium",
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    margin: 5,
    color: "#000",
    fontFamily: "PoppinsLight",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    fontFamily: "PoppinsLight",
  },
  inputPicker: {
    backgroundColor: "whitesmoke",
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  updateButton: {
    padding: Spacing,
    backgroundColor: Colors.primary,
    marginBottom: 10,
    marginTop: 20,
    // width:'100%'
  },
  deleteButton: {
    padding: Spacing,
    // backgroundColor:'tr',

    // width:'100%'
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
  },
});
