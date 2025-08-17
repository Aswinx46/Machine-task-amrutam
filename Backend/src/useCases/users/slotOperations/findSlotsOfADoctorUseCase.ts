import { SlotDTO } from "../../../domain/entity/doctor/slotDTO";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IfindSlotsOfADoctorInUserSideUseCase } from "../../../domain/interface/useCaseInterfaces/Client/slots/findSlotsOfADoctorUseCaseInterface";
import { SlotMapper } from "../../mappers/doctor/slotMapper";

export class FindSlotsOfDoctorInUserSde implements IfindSlotsOfADoctorInUserSideUseCase {
    constructor(private _slotRepository: IslotRepository) { }
    async findSlots(doctorId: string, page: number, limit: number): Promise<{ slots: SlotDTO[]; totalPages: number; }> {
        const { slots, totalPages } = await this._slotRepository.findSlotsOfADoctor(doctorId, page, limit)
        const mappedDTO = slots.map((slot) => SlotMapper.toDTO(slot))
        return { slots: mappedDTO, totalPages }
    }
}