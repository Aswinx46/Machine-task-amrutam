import { SlotEntity, SlotPopulatedEntity } from "../../entity/doctor/slotEntity";

export interface IslotRepository {
    createSlot(data: SlotEntity): Promise<SlotEntity | null>
    findExistingSlot(doctorId: string, date: Date, startTime: Date, endTime: Date, startOfDate: Date, endOfDate: Date): Promise<SlotEntity | null>
    findSlotsOfADoctor(doctorId: string, page: number, limit: number): Promise<{ slots: SlotEntity[], totalPages: number }>
    findSlots(page: number, limit: number, searchQuery?: string, filter?: string, mode?: string, minPrice?: number, maxPrice?: number, duration?: number): Promise<{ slots: SlotPopulatedEntity[], totalPages: number }>
}