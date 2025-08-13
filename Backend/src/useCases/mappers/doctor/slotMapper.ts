import { SlotDTO } from "../../../domain/entity/doctor/slotDTO";
import { SlotEntity } from "../../../domain/entity/doctor/slotEntity";

export class SlotMapper {
    static toDTO(data: SlotEntity): SlotDTO {
        return {
            date: data.date,
            doctorId: data.doctorId,
            timings: data.timings,
            _id: data._id
        }
    }
}