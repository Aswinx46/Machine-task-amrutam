import type { DoctorEntity } from "@/types/Doctor/DoctorType";

export interface DoctorSignupFormType extends Omit<DoctorEntity,"_id" | "isDoctor" | "isVerified" | "documentId" | "location">{
    confirmPassword:string
}