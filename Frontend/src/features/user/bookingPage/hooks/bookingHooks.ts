import { useMutation } from "@tanstack/react-query"
import { findDetailsOfSlot, sendOtpAndLockSlot, verifyOtpAndCreateBooking } from "../services/bookingService"
import type { BookingEntity } from "@/types/appointment/appointment"

export const useFindSlotDetails = () => {
    return useMutation({
        mutationFn: ({ slotId, doctorId, timingId }: { slotId: string, doctorId: string, timingId: string }) => findDetailsOfSlot(slotId, doctorId, timingId)
    })
}

export const useSendOtpAndLockSlot = () => {
    return useMutation({
        mutationFn: ({ email, slotId, timingId }: { email: string, slotId: string, timingId: string }) => sendOtpAndLockSlot(email, slotId, timingId)
    })
}

export const useVerifyOtpAndCreateBooking = () => {
    return useMutation({
        mutationFn: ({ data, otp, email }: { data: BookingEntity, otp: string, email: string }) => verifyOtpAndCreateBooking(data, otp, email)
    })
}