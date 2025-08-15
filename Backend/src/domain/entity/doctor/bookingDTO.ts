import { ObjectId } from "mongoose";
import { BookingEntity } from "./bookingEntity";
import { DoctorEntity } from "./doctorEntity";

export interface BookingDTO extends Omit<BookingEntity, '_v' | 'createdAt' | 'updatedAt'> { }

export interface populatedBookingDTO extends Omit<BookingEntity, "doctorId" | "timingId" | "_v" | "createdAt" | "updatedAt"> {
    doctorId: {
        _id: string | ObjectId,
        name: string,
        email: string,
        profileImage?: string
    },
    timingId: {
        startTime: Date,
        endTime: Date,
        consultationDuration: number,
        price: number,
        mode: "online" | "inperson",
        status: "available" | "booked" | "expired",
        _id: ObjectId | string
    }
}

export interface PopulatedBooking extends Omit<BookingEntity, "doctorId" | "timingId"> {
    doctorId: DoctorEntity,
    timingId: {
        startTime: Date,
        endTime: Date,
        consultationDuration: number,
        price: number,
        mode: "online" | "inperson",
        status: "available" | "booked" | "expired",
        _id: ObjectId | string
    }
}