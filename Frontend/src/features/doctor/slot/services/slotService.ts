import type { SlotEntity } from "@/types/appointment/appointment";
import axios from '../../../../axios/doctorAxiosInstance'
export const createSlot = async (data: SlotEntity) => {
    const response = await axios.post('/slot', { data })
    return response.data
}

