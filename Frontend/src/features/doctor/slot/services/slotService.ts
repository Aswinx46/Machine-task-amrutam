import type { SlotEntity } from "@/types/appointment/appointment";
import axios from '../../../../axios/doctorAxiosInstance'
const limit = import.meta.env.VITE_PAGE_LIMIT

export const createSlot = async (data: SlotEntity) => {
    const response = await axios.post('/slot', { data })
    return response.data
}

export const findSlotsOfADoctor = async (page: number) => {
    const response = await axios.get('/slot', { params: { page, limit } })
    return response.data
}

export const findBookingsOfDoctor = async (page: number, filter?: string) => {
    const response = await axios.get('/bookings', { params: { page, limit, filter } })
    return response.data
}