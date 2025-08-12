import { Schema } from "mongoose";
import { DoctorEntity } from "../../../domain/entity/doctor/doctorEntity";
import { DoctorQualification } from "../../constants/doctorQualification";
import { DoctorSpecialization } from "../../constants/doctorSpecialization";

export const doctorSchema = new Schema<DoctorEntity>({
    consultationFee: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    experienceYears: {
        type: Number,
        required: true
    },
    isDoctor: {
        type: Boolean,
        required: true,
        default: true
    },
    languages: {
        type: [String],
        required: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    mode: {
        type: String,
        enum: ['online', 'In-person'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    reviewsCount: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    clinicName: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    qualification:{
        type:[String],
        enum:Object.values(DoctorQualification),
        required:true
    },
    specialization:{
        type:[String],
        enum:Object.values(DoctorSpecialization),
        required:true
    },
    theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'light'
    },
},{
    timestamps:true
})

doctorSchema.index({location:"2dsphere"})
doctorSchema.index({specialization:1,mode:1})