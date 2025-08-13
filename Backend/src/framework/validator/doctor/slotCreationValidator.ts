import { z } from "zod";

// Availability schema
const availabilityTimeSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  isBooked: z.boolean(),
  bookedBy: z.string().optional(),
  consultationDuration: z.number(),
  price: z.string(),
  mode: z.enum(["online", "in-person"]),
  status: z.enum(["active", "inactive", "expired"]),
});

// Slot schema
export const slotCreationSchema= z.object({
  _id: z.string().optional(),
  doctorId: z.string(),
  date: z.coerce.date(), // convert string → Date automatically
  timings: z.array(availabilityTimeSchema)
});
