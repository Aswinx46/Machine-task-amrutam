import { z } from 'zod'
import { DoctorQualification } from '../../constants/doctorQualification'
import { DoctorSpecialization } from '../../constants/doctorSpecialization'
export const doctorSignupSchemaValidator = z.object({
    name: z.string().min(2, "name is required"),
    address: z.string().min(5, "Address is required"),
    bio: z.string().min(5, "BIO is required"),
    clinicName: z.string().min(3, "clinic name is required"),
    email: z.string().email("Invalid Email"),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .refine(
            (val) =>
                /[A-Z]/.test(val) &&
                /[a-z]/.test(val) &&
                /[0-9]/.test(val) &&
                /[!@#$%^&*(),.?":{}|<>]/.test(val),
            {
                message:
                    'Password must include uppercase, lowercase, number, and special character',
            }
        ),
    isDoctor: z.boolean(),
    specialization: z.array(z.nativeEnum(DoctorSpecialization)).min(1, "At least one specialization is required"),
    mode: z.enum(["online", "In-person"]),
    experienceYears: z.number().min(0, "Experience years cannot be negative"),
    consultationFee: z.number().positive("Consultation fee must be positive"),
    qualification: z.array(z.nativeEnum(DoctorQualification)).min(1, "At least one qualification is required"),
    isVerified: z.boolean().default(false),
    location: z.object({
        type: z.literal("Point"),
        coordinates: z
            .tuple([z.number(), z.number()])
            .refine(coords => coords.length === 2, { message: "Coordinates must have exactly 2 values [lng, lat]" })
    }),
    rating: z.number().min(0).max(5).optional(),
    reviewsCount: z.number().min(0).optional(),
    languages: z.array(z.string()).optional()
})