import { z } from "zod";

// Availability schema
const availabilityTimeSchema = z.object({
  startTime: z.coerce.date(), // coerce to Date (in case frontend sends string)
  endTime: z.coerce.date(),
  isBooked: z.boolean(),
  bookedBy: z.string().optional(),
  consultationDuration: z.number(),
  price: z.string(),
  mode: z.enum(["online", "in-person"]),
  status: z.enum(["active", "inactive", "expired"]),
})
  .refine((data) => data.startTime < data.endTime, {
    path: ["endTime"],
    message: "End time must be greater than start time",
  })


// Slot schema
export const slotCreationSchema = z.object({
  _id: z.string().optional(),
  doctorId: z.string(),
  date: z.coerce.date(), // convert string → Date automatically
  timings: z.array(availabilityTimeSchema)
}).superRefine((data, ctx) => {
  const seen = new Set<string>();

  data.timings.forEach((slot, index) => {
    const key = `${slot.startTime.getTime()}-${slot.endTime.getTime()}`;
    if (seen.has(key)) {
      ctx.addIssue({
        path: ["timings", index],
        code: z.ZodIssueCode.custom,
        message: "Duplicate timing slot detected",
      });
    }
    seen.add(key);
  });
});
