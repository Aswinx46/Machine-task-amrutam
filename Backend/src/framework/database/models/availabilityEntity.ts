import { Document, model, ObjectId } from "mongoose";
import { AvailabilityEntity } from "../../../domain/entity/doctor/availabilityEntity";
import { availabilitySchema } from "../schema/availabilitySchema";

export interface IavailabilityEntity extends Omit<AvailabilityEntity, '_id'>, Document {
    _id: ObjectId
}
export const availabilityModel = model<AvailabilityEntity>('availabilityOfDoctors', availabilitySchema)