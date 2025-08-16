import axios from '../../../../axios/userAxiosInstance'
export const findDetailsOfSlot = async (slotId: string, doctorId: string, timingId: string) => {
    const response = await axios.get(`/slot/${slotId}/${doctorId}/${timingId}`)
    return response.data
}