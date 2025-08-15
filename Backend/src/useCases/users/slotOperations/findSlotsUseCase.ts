import { SlotPopulatedEntity } from "../../../domain/entity/doctor/slotEntity";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IfindSlotsUseCase } from "../../../domain/interface/useCaseInterfaces/Client/slots/findSlotsUseCaseInterface";

export class FindSlotsUseCase implements IfindSlotsUseCase {
    constructor(private _slotRepository: IslotRepository) { }
    async findSlots(page: number, limit: number, searchQuery?: string, filter?: string, mode?: string, minPrice?: number, maxPrice?: number, duration?: number): Promise<{ slots: SlotPopulatedEntity[]; totalPages: number; }> {
        return await this._slotRepository.findSlots(page, limit, searchQuery, filter, mode, minPrice, maxPrice, duration)
    }
}