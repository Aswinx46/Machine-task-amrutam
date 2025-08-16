import { IavailabilityTime, SlotEntity, SlotPopulatedEntity } from "../../entity/doctor/slotEntity";

export interface IslotRepository {
    createSlot(data: SlotEntity): Promise<SlotEntity | null>
    findExistingSlot(doctorId: string, date: Date, startTime: Date, endTime: Date, startOfDate: Date, endOfDate: Date): Promise<SlotEntity | null>
    findSlotsOfADoctor(doctorId: string, page: number, limit: number): Promise<{ slots: SlotEntity[], totalPages: number }>
    findSlots(page: number, limit: number, todayDate: Date, searchQuery?: string, filter?: string, mode?: string, minPrice?: number, maxPrice?: number, duration?: number): Promise<{ slots: SlotPopulatedEntity[], totalPages: number }>
    getStatusOfSlot(slotId: string, timingId: string): Promise<string | null>
    findSlotAndUpdateStatus(slotId: string, timingId: string): Promise<boolean>
    findSlotByDoctorAndDate(doctorId: string, startOfDate: Date, endOfDate: Date): Promise<SlotEntity | null>
    addTimingToSlot(slotId: string, timings: IavailabilityTime[]): Promise<SlotEntity | null>
    findDetailsOfASlot(slotId: string, doctorId: string): Promise<SlotPopulatedEntity | null>
}