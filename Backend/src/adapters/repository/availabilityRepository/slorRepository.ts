import { SlotEntity } from "../../../domain/entity/doctor/slotEntity";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { slotModel } from "../../../framework/database/models/slotModel";
export class SlotRepository implements IslotRepository {
    async createSlot(data: SlotEntity): Promise<SlotEntity | null> {
        return await slotModel.create(data)
    }
    async findExistingSlot(doctorId: string, date: Date, startTime: string, endTime: string, startOfDate: Date, endOfDate: Date): Promise<SlotEntity | null> {
        return await slotModel.findOne({
            doctorId,
            date: { $gte: startOfDate, $lte: endOfDate },
            timings: {
                $elemMatch: {
                    startTime,
                    endTime
                }
            }
        })
    }
}