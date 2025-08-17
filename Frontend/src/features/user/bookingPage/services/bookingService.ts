import type { BookingEntity } from '@/types/appointment/appointment'
import axios from '../../../../axios/userAxiosInstance'
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
    const limit = import.meta.env.VITE_PAGE_LIMIT
    const response = await axios.get('/bookings', { params: { page, limit, filter } })
    return response.data
}