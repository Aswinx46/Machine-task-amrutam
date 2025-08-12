import { Document, model, ObjectId } from "mongoose";
import { DoctorEntity } from "../../../domain/entity/doctor/doctorEntity";
import { doctorSchema } from "../schema/doctorSchema";

export interface IdoctorSchema extends Omit<DoctorEntity, '_id'>, Document {
    _id: ObjectId
}
export const doctorModel = model<DoctorEntity>('doctor', doctorSchema)