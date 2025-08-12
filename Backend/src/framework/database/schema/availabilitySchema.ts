import { Schema } from "mongoose";
import { AvailabilityEntity } from "../../../domain/entity/doctor/availabilityEntity";

export const availabilitySchema = new Schema<AvailabilityEntity>({
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
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isBooked: { type: Boolean, required: false, default: false },
        bookedBy: { type: Schema.Types.ObjectId, ref: 'user', required: false },
        consultationDuration: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
}, {
    timestamps: true
})

availabilitySchema.index({ timings: 1, doctorId: 1 })