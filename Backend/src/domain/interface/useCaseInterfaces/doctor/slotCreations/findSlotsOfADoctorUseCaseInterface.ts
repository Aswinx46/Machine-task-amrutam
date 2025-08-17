import { SlotDTO } from "../../../../entity/doctor/slotDTO";

export interface IfindSlotsOfADoctor {
    findSlots(doctorId: string, page: number, limit: number): Promise<{ slots: SlotDTO[], totalPages: number }>
}