import { SlotPopulatedDTO } from "../../../domain/entity/doctor/slotEntity";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IfindDetailsOfASlotUseCase } from "../../../domain/interface/useCaseInterfaces/Client/slots/findDetailsOfASlotInterface";
import { SlotMapperUser } from "../../mappers/user/slotMapper";

export class FindDetailsOfASlotUseCase implements IfindDetailsOfASlotUseCase {
    constructor(private _slotRepository: IslotRepository) { }
    async findDetailsOfASlot(slotId: string, doctorId: string, timingId: string): Promise<SlotPopulatedDTO> {
        const slotDetails = await this._slotRepository.findDetailsOfASlot(slotId, doctorId)
        if (!slotDetails) throw new Error("No Slot Found in this ID")
        const foundTiming = slotDetails.timings.find(
            (item) => item._id?.toString() === timingId
        )
        if (!foundTiming) throw new Error("No Timing Found in this ID")
        return SlotMapperUser.toDTO(slotDetails, foundTiming)
    }
}