import { Schema } from "mongoose";
import { SlotEntity } from "../../../domain/entity/doctor/slotEntity";

export const slotSchema = new Schema<SlotEntity>({
    date: {
        type: Date,
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    timings: [{
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        isBooked: { type: Boolean, required: false, default: false },
        bookedBy: { type: Schema.Types.ObjectId, ref: 'user', required: false },
        consultationDuration: { type: Number, required: true },
        price: { type: Number, required: true },
        mode: { type: String, enum: ["online", "in-person"], required: true, default: 'online' },
        status: { type: String, enum: ["active", "inactive", "expired"], required: true, default: 'active' },
    }],

}, {
    timestamps: true
})

slotSchema.index({ timings: 1, doctorId: 1 })