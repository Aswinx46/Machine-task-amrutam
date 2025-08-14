import { SlotEntity } from "../../../domain/entity/doctor/slotEntity";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { slotModel } from "../../../framework/database/models/slotModel";
export class SlotRepository implements IslotRepository {
    async createSlot(data: SlotEntity): Promise<SlotEntity | null> {
        return await slotModel.create(data)
    }
    async findExistingSlot(doctorId: string, date: Date, startTime: Date, endTime: Date, startOfDate: Date, endOfDate: Date): Promise<SlotEntity | null> {
        return await slotModel.findOne({
            doctorId,
            date: { $gte: startOfDate, $lte: endOfDate },
            timings: {
                $elemMatch: {
                    startTime: { $lt: endTime },
                    endTime: { $gt: startTime }
                }
            }
        })
    }
    async findSlotsOfADoctor(doctorId: string, page: number, limit: number): Promise<{ slots: SlotEntity[]; totalPages: number; }> {
        const skip = (page - 1) * limit
        const [slots, totalCount] = await Promise.all([
            slotModel.find({ doctorId }).skip(skip).limit(limit),
            slotModel.countDocuments({ doctorId })
        ])
        const totalPages = Math.ceil(totalCount / limit)
        return { slots, totalPages }
    }
}