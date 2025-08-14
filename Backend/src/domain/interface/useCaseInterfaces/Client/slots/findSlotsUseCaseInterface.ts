import { SlotPopulatedEntity } from "../../../../entity/doctor/slotEntity";

export interface IfindSlotsUseCase {
    findSlots(page: number, limit: number, searchQuery?: string, filter?: string, mode?: string,): Promise<{ slots: SlotPopulatedEntity[], totalPages: number }>
}