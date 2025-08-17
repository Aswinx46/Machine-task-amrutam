import { useMutation, useQuery } from "@tanstack/react-query"
import { findSlots, userLogout } from "../services/userHomeServices"

export const useFindSlots = (page: number, limit: number, searchQuery?: string, mode?: string, minPrice?: number | string, maxPrice?: number | string, duration?: number | string) => {
    return useQuery({
        queryKey: ['userSlots', page, searchQuery, mode, minPrice, maxPrice, duration],
        queryFn: () => findSlots(page, limit, searchQuery, mode, minPrice, maxPrice, duration)
    })
}

export const useUserLogout = () => {
    return useMutation({
        mutationFn: userLogout
    })
}