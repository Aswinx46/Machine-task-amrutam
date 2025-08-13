import { SlotEntity } from "../../entity/doctor/slotEntity";

export interface IslotRepository {
    createSlot(data: SlotEntity): Promise<SlotEntity | null>
    findExistingSlot(doctorId: string, date: Date, startTime: string, endTime: string, startOfDate: Date, endOfDate: Date): Promise<SlotEntity | null>
}