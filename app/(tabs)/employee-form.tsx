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
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";

export default function EmployeeForm() {
  const [education, setEducation] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.header}>Sleeky Programmers</Title>
            <Text style={styles.subheading}>employee biodata</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput style={styles.input} placeholder="Enter first name" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput style={styles.input} placeholder="Enter last name" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter house address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Emergency Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter emergency contact"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bank Name</Text>
              <TextInput style={styles.input} placeholder="Enter bank name" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bank Account Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter account number"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter account name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Next of Kin (NOK) Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter next of kin name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>(NOK) Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter next of kin number"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>(NOK) Relationship</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter next of kin relationship"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Role</Text>
              <TextInput style={styles.input} placeholder="Enter role" />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Start Date</Text>
              <TextInput
                style={styles.input}
                placeholder="mm/dd/yy"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="mm/dd/yy"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Educational Level</Text>
              <Picker
                style={styles.inputPicker}
                selectedValue={education}
                onValueChange={(currentEducation) =>
                  setEducation(currentEducation)
                }
              >
                <Picker.Item label="High School" value="highschool" />
                <Picker.Item label="ND" value="nd" />
                <Picker.Item label="HND" value="hnd" />
                <Picker.Item label="Bachelor's Degree" value="bachelor" />
                <Picker.Item label="Master's Degree" value="master" />
                <Picker.Item label="Doctorate" value="doctorate" />
              </Picker>
            </View>
            <Pressable style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                <Link href="/#">Submit</Link>
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
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
  },
});
