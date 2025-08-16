import {  SlotPopulatedDTO } from "../../../../entity/doctor/slotEntity";

export interface IfindDetailsOfASlotUseCase {
    findDetailsOfASlot(slotId: string, doctorId: string, timingId: string): Promise<SlotPopulatedDTO>
}