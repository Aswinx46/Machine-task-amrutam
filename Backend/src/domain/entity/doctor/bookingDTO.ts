import { ObjectId } from "mongoose";
import { BookingEntity } from "./bookingEntity";
import { DoctorEntity } from "./doctorEntity";

export interface BookingDTO extends Omit<BookingEntity, '_v' | 'createdAt' | 'updatedAt'> { }

export interface PopulatedBookingDTO extends Omit<BookingEntity, "doctorId" | "timingId" | "slotId" | "_v" | "createdAt" | "updatedAt" | 'recurring' | 'ruleId'> {
    doctorId: {
        _id: string | ObjectId,
        name: string,
        email: string,
        profileImage?: string
    },
}

export interface PopulatedBooking extends Omit<BookingEntity, "doctorId" | "timingId"> {
    doctorId: DoctorEntity,
}

export interface PopulatedBookingForDoctorDTO extends Omit<BookingEntity, "userId"> {
    userId: {
        _id: ObjectId | string,
        name?: string,
        email: string
    }
}