import { ObjectId } from "mongoose";
import { UserEntity } from "../user/userEntity";
import { DoctorQualification } from "../../../framework/constants/doctorQualification";
import { DoctorSpecialization } from "../../../framework/constants/doctorSpecialization";


export interface DoctorEntity extends Omit<UserEntity, 'googleVerified' | "_id"> {
    _id: ObjectId | string
    isDoctor: boolean,
    bio:string,
    specialization: DoctorSpecialization[],
    mode: "online" | "In-person",
    experienceYears: number,
    documentId?:string
    qualification:DoctorQualification[],
    isVerified:boolean,
    clinicName:string
    address:string,
    // location: {
    //     type: string,
    //     coordinates: [number, number]
    // },
    rating?: number,
    reviewsCount?: number,
    languages?: string[]
}