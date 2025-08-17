import type { BookingEntity, BookingStatus } from '@/types/appointment/appointment'
import axios from '../../../../axios/userAxiosInstance'
const limit = import.meta.env.VITE_PAGE_LIMIT
export const findDetailsOfSlot = async (slotId: string, doctorId: string, timingId: string) => {
    const response = await axios.get(`/slot/${slotId}/${doctorId}/${timingId}`)
    return response.data
}

export const sendOtpAndLockSlot = async (email: string, slotId: string, timingId: string) => {
    const response = await axios.post('/slots/otp/request', { email, slotId, timingId })
    return response.data
}

export const verifyOtpAndCreateBooking = async (data: BookingEntity, otp: string, email: string) => {
    const response = await axios.post('/slots/otp/verify', { data, otp, email })
    return response.data
}

export const findBookingsOfuser = async (page: number, filter?: string) => {
    const response = await axios.get('/bookings', { params: { page, limit, filter } })
    return response.data
}

export const cancelOrRescheduleBooking = async (bookingId: string, doctorId: string, page: number, status: BookingStatus) => {
    const response = await axios.patch(`/bookings/${bookingId}/${doctorId}`, { page, limit, status })
    return response.data
}