import { Document, model, ObjectId } from "mongoose";
import { SlotEntity } from "../../../domain/entity/doctor/slotEntity";
import { slotSchema } from "../schema/slotSchema";

export interface IavailabilityEntity extends Omit<SlotEntity, '_id'>, Document {
    _id: ObjectId
}
export const slotModel = model<SlotEntity>('availabilityOfDoctors', slotSchema)