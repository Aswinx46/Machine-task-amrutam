import { ObjectId } from "mongoose";
import { DoctorDTO } from "./doctorDTO";

export interface IavailabilityTime {
    _id?: string | ObjectId
    startTime: Date,
    endTime: Date,
    isBooked: boolean,
    bookedBy?: ObjectId | string;
    consultationDuration: number,
    price: string
    mode: "online" | "in-person"
    status: "active" | "inactive" | "expired" | "booked"
}

export interface SlotEntity {
    _id?: ObjectId | string
    doctorId: ObjectId | string
    date: Date,
    timings: IavailabilityTime[]
}


export interface SlotPopulatedEntity extends Omit<SlotEntity, "doctorId"> {
    doctorId: DoctorDTO
}

export interface SlotPopulatedDTO extends Omit<SlotPopulatedEntity, "timings"> {
    timings: IavailabilityTime
}