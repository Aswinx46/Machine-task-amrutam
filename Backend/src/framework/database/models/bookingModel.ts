import { model, ObjectId } from "mongoose";
import { BookingEntity } from "../../../domain/entity/doctor/bookingEntity";
import { bookingSchema } from "../schema/bookingSchema";

export interface IbookingEntity extends Omit<BookingEntity, '_id'>, Document {
    _id: ObjectId
}

export const bookingModel = model<BookingEntity>('booking', bookingSchema)