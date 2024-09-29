import { z } from "zod";

export const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    emailAddress: z.string().email(),
    physicalAddress: z.string(),
    phoneNumber: z.string(),
    emergencyPhoneNumber: z.string(),
    bankName: z.string(),
    bankAccountNumber: z.number(),
    accountName: z.string(),
    nextOfKinFullName: z.string(),
    nextOfKinPhoneNumber: z.string(),
    nextOfKinRelationship: z.string(),
    employmentRole: z.string(),
    employmentStartDate: z.date(),
    dateOfBirth: z.date(),
    educationalLevel: z.string(),
  });