import { SlotDTO } from "../../../../entity/doctor/slotDTO";

export interface IfindSlotsOfADoctorInUserSideUseCase {
    findSlots(doctorId: string, page: number, limit: number): Promise<{ slots: SlotDTO[], totalPages: number }>
}