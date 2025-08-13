import { ObjectId } from "mongoose";

export interface IavailabilityTime {
    startTime: string,
    endTime: string,
    isBooked: boolean,
    bookedBy?: ObjectId | string;
    consultationDuration: number,
    price: string
    mode: "online" | "in-person"
    status: "active" | "inactive" | "expired"
}

export interface SlotEntity {
    _id?: ObjectId | string
    doctorId: ObjectId | string
    date: Date,
    timings: IavailabilityTime[]
}