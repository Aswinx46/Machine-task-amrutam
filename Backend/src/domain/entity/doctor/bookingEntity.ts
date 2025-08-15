import { ObjectId } from "mongoose";

export interface BookingEntity {
    _id?: ObjectId | string;
    doctorId: ObjectId | string;
    ruleId?: ObjectId | string;
    date: Date;
    startTime: string
    endTime: string;
    status: "available" | "booked" | "expired"
    recurring: boolean
    slotId: ObjectId | string
    userId: ObjectId | string
    timingId: ObjectId | string
}

