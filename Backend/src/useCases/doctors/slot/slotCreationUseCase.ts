import { SlotDTO } from "../../../domain/entity/doctor/slotDTO";
import { SlotEntity } from "../../../domain/entity/doctor/slotEntity";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IslotCreationUseCase } from "../../../domain/interface/useCaseInterfaces/doctor/slotCreations/slotCreationsUseCaseInterface";
import { SlotMapper } from "../../mappers/doctor/slotMapper";

export class CreateSlotUseCase implements IslotCreationUseCase {
    constructor(private _slotRepository: IslotRepository) { }
    async createSlot(data: SlotEntity): Promise<SlotDTO> {
        const startOfDate = new Date(data.date);
        startOfDate.setHours(0, 0, 0, 0);

        const endOfDate = new Date(data.date);
        endOfDate.setHours(23, 59, 59, 999);

        for (let i = 0; i < data.timings.length; i++) {
            for (let j = i+1; j < data.timings.length; j++) {
                if (data.timings[i].startTime < data.timings[j].endTime && data.timings[i].endTime > data.timings[j].startTime) {
                    throw new Error("Conflict between provided timings in the same slot request")
                }
            }
        }

        const checks = data.timings.map((item) => {
            return this._slotRepository.findExistingSlot(data.doctorId.toString(), data.date, item.startTime, item.endTime, startOfDate, endOfDate)
        })
        const results = await Promise.all(checks)
        if (results.some(Boolean)) {
            throw new Error('Already slot exist in that date and time');
        }

        const createdSlot = await this._slotRepository.createSlot(data)
        if (!createdSlot) throw new Error("Error while creating the slot")
        return SlotMapper.toDTO(createdSlot)
    }
}