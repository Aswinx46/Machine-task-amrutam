import { Schema } from "mongoose";
import { BookingEntity } from "../../../domain/entity/doctor/bookingEntity";

export const bookingSchema = new Schema<BookingEntity>({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    recurring: {
        type: Boolean,
        required: true,
        default: false
    },
    ruleId: {
        type: Schema.Types.ObjectId,
        ref: 'availableRule',
        required: false
    },
    startTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'expired']
    },
}, {
    timestamps: true
})

bookingSchema.index({ doctorId: 1, date: 1 })
