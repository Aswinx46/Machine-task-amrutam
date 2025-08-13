import { SlotEntity } from "../../../../entity/doctor/slotEntity";

export interface IslotCreationUseCase {
    createSlot(data: SlotEntity): Promise<SlotDTO>
}