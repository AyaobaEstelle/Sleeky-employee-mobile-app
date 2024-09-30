import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { Card, Title } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import useSWRMutation from "swr/mutation";
import { Employee } from "@/lib/types";
import { createEmployee } from "@/lib/createEmployee";
import CustomeDatePicker from "@/components/CustomeDatePicker";

export default function CreateEmployeeForm() {
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");
  const [value, setValue] = useState(dayjs());
  const {
    data,
    trigger,
    isMutating: isLoading,
  } = useSWRMutation(
    "https://employee-management-api-xj3a.onrender.com/employees",
    createEmployee
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

  const submit = async () => {
    try {
      const result = await trigger({
        ...data,
        id: formData._id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        emailAddress: formData.emailAddress,
        physicalAddress: formData.physicalAddress,
        phoneNumber: `+234${Number(formData.phoneNumber)}`,
        emergencyPhoneNumber: `+234${Number(formData.emergencyPhoneNumber)}`,
        bankName: formData.bankName,
        bankAccountNumber: Number(formData.bankAccountNumber),
        accountName: formData.accountName,
        nextOfKinFullName: formData.nextOfKinFullName,
        nextOfKinPhoneNumber: `+234${Number(formData.nextOfKinPhoneNumber)}`,
        nextOfKinRelationship: formData.nextOfKinRelationship,
        employmentRole: formData.employmentRole,
        employmentStartDate: new Date(formData.employmentStartDate),
        dateOfBirth: new Date(formData.dateOfBirth),
        educationalLevel: formData.educationalLevel,
      });
      if (result) {
        console.log("form submitted successfully");
        setFormData({
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
        // router.push("/(tabs)/employee-details-page");
      }
    } catch (error) {
      console.log(error);
      return;
    }
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
            <Pressable style={styles.submitButton} onPress={submit}>
              <Text style={styles.submitButtonText}>
                {isLoading ? "Loading..." : "Save"}
              </Text>
            </Pressable>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  submitButton: {
    padding: Spacing,
    backgroundColor: Colors.primary,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
  },
});
