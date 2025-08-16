import { useMutation } from "@tanstack/react-query"
import { findDetailsOfSlot } from "../services/bookingService"

export const useFindSlotDetails = () => {
    return useMutation({
        mutationFn: ({ slotId, doctorId, timingId }: { slotId: string, doctorId: string, timingId: string }) => findDetailsOfSlot(slotId, doctorId, timingId)
    })
}