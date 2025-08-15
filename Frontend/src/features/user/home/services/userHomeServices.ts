import axios from '../../../../axios/userAxiosInstance'

export const findSlots = async (page: number, limit: number, searchQuery?: string, mode?: string, minPrice?: number | string, maxPrice?: number | string, duration?: number | string) => {
    const response = await axios.get('/slots', { params: { page, limit, searchQuery, mode, minPrice, maxPrice, duration } })
    return response.data
}