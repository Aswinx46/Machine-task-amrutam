import { z } from "zod";
export const bookingDataValidator = z.object({
    _id: z.string().optional(), // frontend might send as string
    doctorId: z.string().min(1, "doctorId is required"),
    ruleId: z.string().optional(),
    date: z.preprocess(
        (val) => (val ? new Date(val as string) : undefined),
        z.date()
    ),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "startTime must be in HH:mm format",
    }),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "endTime must be in HH:mm format",
    }),
    status: z.enum(["available", "booked", "expired"]),
    recurring: z.boolean(),
    slotId: z.string().min(1, "slotId is required"),
    userId: z.string().min(1, "userId is required"),
    timingId: z.string().min(1, "timingId is required"),
});