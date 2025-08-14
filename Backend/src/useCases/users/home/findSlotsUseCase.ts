import { SlotDTO } from "../../../domain/entity/doctor/slotDTO";
import { SlotPopulatedEntity } from "../../../domain/entity/doctor/slotEntity";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IfindSlotsUseCase } from "../../../domain/interface/useCaseInterfaces/Client/slots/findSlotsUseCaseInterface";
import { IfindSlotsOfADoctor } from "../../../domain/interface/useCaseInterfaces/doctor/slotCreations/findSlotsOfADoctorUseCaseInterface";

export class FindSlotsUseCase implements IfindSlotsUseCase {
    constructor(private _slotRepository: IslotRepository) { }
    async findSlots(page: number, limit: number, searchQuery?: string, filter?: string, mode?: string): Promise<{ slots: SlotPopulatedEntity[]; totalPages: number; }> {
        return await this._slotRepository.findSlots(page, limit, searchQuery, filter, mode)
    }
}