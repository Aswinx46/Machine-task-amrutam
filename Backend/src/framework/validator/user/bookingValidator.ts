import { z } from "zod";
export const bookingDataValidator = z.object({
    _id: z.string().optional(), // frontend might send as string
    doctorId: z.string().min(1, "doctorId is required"),
    ruleId: z.string().optional(),
    date: z.preprocess(
        (val) => (val ? new Date(val as string) : undefined),
        z.date()
    ),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    status: z.enum(["available", "booked", "expired"]),
    recurring: z.boolean(),
    slotId: z.string().min(1, "slotId is required"),
    userId: z.string().min(1, "userId is required"),
    mode:z.enum(['online','in-person']),
    timingId: z.string().min(1, "timingId is required"),
});