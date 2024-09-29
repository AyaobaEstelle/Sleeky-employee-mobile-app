import { ReactNode } from "react"

export interface Employee {
    _id: string
    firstName: string
    lastName: string
    gender: "MALE"| "FEMALE" | string,
    emailAddress: string
    physicalAddress: string
    phoneNumber: string
    emergencyPhoneNumber: string
    bankName: string
    bankAccountNumber: number | string
    accountName: string
    nextOfKinFullName: string
    nextOfKinPhoneNumber: string
    nextOfKinRelationship: string
    employmentRole: string
    employmentStartDate:  string;
    dateOfBirth:  string;
    educationalLevel: string
}