import type { UserType } from "@/types/user/userType"

export enum DoctorSpecialization {
    AYURVEDIC_GENERAL = 'Ayurvedic General Medicine',
    PANCHAKARMA = 'Panchakarma',
    AYURVEDIC_DERMATOLOGY = 'Ayurvedic Dermatology',
    AYURVEDIC_PEDIATRICS = 'Ayurvedic Pediatrics',
    AYURVEDIC_PSYCHIATRY = 'Ayurvedic Psychiatry',
    AYURVEDIC_GYNECOLOGY = 'Ayurvedic Gynecology',
    AYURVEDIC_ORTHOPEDICS = 'Ayurvedic Orthopedics'
  }

  export enum DoctorQualification {
    BAMS = 'BAMS', // Bachelor of Ayurvedic Medicine and Surgery
    MD_AYURVEDA = 'MD Ayurveda',
    MS_AYURVEDA = 'MS Ayurveda',
    PHD_AYURVEDA = 'PhD Ayurveda',
    DIPLOMA_PANCHAKARMA = 'Diploma in Panchakarma'
  }

export interface DoctorEntity extends Omit<UserType, 'googleVerified' | "_id"> {
    _id: string
    isDoctor: boolean,
    bio: string,
    specialization: DoctorSpecialization[],
    mode: "online" | "In-person",
    experienceYears: number,
    documentId?: string
    qualification: DoctorQualification[],
    isVerified: boolean,
    clinicName: string
    address: string,
    location: {
        type: string,
        coordinates: [number, number]
    },
    rating?: number,
    reviewsCount?: number,
    languages?: string[]
}