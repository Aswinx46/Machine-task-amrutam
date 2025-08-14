import { ObjectId } from "mongoose";

export interface IavailabilityTime {
    startTime: Date,
    endTime: Date,
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


export interface SlotPopulatedEntity extends Omit<SlotEntity, "doctorId"> {
    doctorId: {
        _id: string | ObjectId,
        name: string,
        specification: string
    }
}
