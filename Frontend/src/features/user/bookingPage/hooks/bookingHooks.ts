import { useMutation, useQuery } from "@tanstack/react-query"
import { cancelOrRescheduleBooking, findBookingsOfuser, findDetailsOfSlot, sendOtpAndLockSlot, verifyOtpAndCreateBooking } from "../services/bookingService"
import type { BookingEntity, BookingStatus } from "@/types/appointment/appointment"

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

export const useFindBookingsOfUser = (page: number, filter?: string) => {
    return useQuery({
        queryKey: ['bookingsOfUser', page, filter],
        queryFn: () => findBookingsOfuser(page, filter)
    })
}

export const useCancellOrRescheduleBooking = () => {
    return useMutation({
        mutationFn: ({ bookingId, doctorId, page, status }: { bookingId: string, doctorId: string, page: number, status: BookingStatus }) => cancelOrRescheduleBooking(bookingId, doctorId, page, status)
    })
}