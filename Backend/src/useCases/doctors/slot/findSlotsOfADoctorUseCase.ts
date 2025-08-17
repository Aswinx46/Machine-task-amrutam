import { SlotDTO } from "../../../domain/entity/doctor/slotDTO";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IfindSlotsOfADoctor } from "../../../domain/interface/useCaseInterfaces/doctor/slotCreations/findSlotsOfADoctorUseCaseInterface";
import { SlotMapper } from "../../mappers/doctor/slotMapper";

export class FindSlotsOfADoctorUseCase implements IfindSlotsOfADoctor {
    constructor(private _slotRepository: IslotRepository) { }
    async findSlots(doctorId: string, page: number, limit: number): Promise<{ slots: SlotDTO[]; totalPages: number; }> {
        const { slots, totalPages } = await this._slotRepository.findSlotsOfADoctor(doctorId, page, limit)
        const mappedDTO = slots.map((slot) => SlotMapper.toDTO(slot))
        return { slots: mappedDTO, totalPages }
    }
}