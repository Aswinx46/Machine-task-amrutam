import { IavailabilityTime, SlotPopulatedDTO, SlotPopulatedEntity } from "../../../domain/entity/doctor/slotEntity";

export class SlotMapperUser {
    static toDTO(data: SlotPopulatedEntity, timing: IavailabilityTime): SlotPopulatedDTO {
        return {
            date: data.date,
            doctorId: data.doctorId,
            timings: timing,
            _id: data._id
        }
    }
}