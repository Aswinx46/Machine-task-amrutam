import type { SlotEntity } from "@/types/appointment/appointment"
import { useMutation } from "@tanstack/react-query"
import { createSlot } from "../services/slotService"

export const useCreateSlot = () => {
    return useMutation({
        mutationFn: (data: SlotEntity) => createSlot(data)
    })
}