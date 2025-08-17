import type { SlotEntity } from "@/types/appointment/appointment";

export function checkDateConflict(data: SlotEntity): boolean {
    for (let i = 0; i < data.timings.length; i++) {
        for (let j = i + 1; j < data.timings.length; j++) {
            if (data.timings[i].startTime < data.timings[j].endTime && data.timings[i].endTime > data.timings[j].startTime) {
                return true
            }
        }
    }
    return false
} 