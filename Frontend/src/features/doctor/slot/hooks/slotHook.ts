import type { SlotEntity } from "@/types/appointment/appointment"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createSlot, findBookingsOfDoctor, findSlotsOfADoctor } from "../services/slotService"

export const useCreateSlot = () => {
    return useMutation({
        mutationFn: (data: SlotEntity) => createSlot(data)
    })
}

export const useFindSlotsOfDoctor = (page: number) => {
    return useQuery({
        queryKey: ['slots', page],
        queryFn: () => findSlotsOfADoctor(page)
    })
}

export const useFindBookingOfDoctor = (page: number, filter?: string) => {
    return useQuery({
        queryKey: ['bookings', page, filter],
        queryFn: () => findBookingsOfDoctor(page, filter)
    })
}