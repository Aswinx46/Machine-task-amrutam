import { SlotEntity, SlotPopulatedEntity } from "../../../domain/entity/doctor/slotEntity";
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
    async findSlots(page: number, limit: number, searchQuery?: string, filter?: string, mode?: string, minPrice?: number, maxPrice?: number, duration?: number): Promise<{ slots: SlotPopulatedEntity[]; totalPages: number; }> {
        const skip = (page - 1) * limit
        const searchFilter: any = {
            timings: {
                $elemMatch: {
                    isBooked: false,
                    status: "active",
                    // startTime: { $gte: new Date() }
                }
            },
            date: { $gte: new Date() }
        };
        if (mode) {
            searchFilter.timings.$elemMatch.mode = mode;
        }
        if (minPrice || maxPrice) {
            searchFilter.timings.$elemMatch.price = {};
            if (minPrice) searchFilter.timings.$elemMatch.price.$gte = Number(minPrice)
            if (maxPrice) searchFilter.timings.$elemMatch.price.$lte = Number(maxPrice)
        }
        if (searchQuery) {
            searchFilter.$or = [
                { "doctor.name": { $regex: searchQuery, $options: 'i' } },
                { "doctor.specialization": { $regex: searchQuery, $options: "i" } }
            ]
        }
        if (duration) {
            searchFilter.timings.$elemMatch.consultationDuration = Number(duration)
        }
        const slots = await slotModel.aggregate([

            {
                $lookup: {
                    from: "doctors",
                    let: { doctorId: "$doctorId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$doctorId"] } } },
                        { $project: { name: 1, specialization: 1 } }
                    ],
                    as: "doctor"
                }
            },
            {
                $unwind: "$doctor",
            },
            {
                $match: searchFilter
            },
            {
                $sort: { date: 1 },

            },
            {
                $skip: skip,
            }, {

                $limit: limit
            },
        ])
        const totalCount = await slotModel.aggregate([
            { $match: searchFilter },
            {
                $lookup: {
                    from: "doctors",
                    let: { doctorId: "$doctorId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$doctorId"] } } }
                    ],
                    as: "doctor"
                }
            },
            { $unwind: "$doctor" },
            { $count: "total" }
        ]);

        const totalPages = Math.ceil((totalCount[0]?.total || 0) / limit)

        return { slots, totalPages }
    }
    async getStatusOfSlot(slotId: string, timingId: string): Promise<string | null> {
        const filter = {
            _id: slotId,
            "timings._id": timingId
        }
        const doc = await slotModel.findOne(filter).select('status').lean<{ _id: string, status: string }>()
        return doc?.status || null
    }
    async findSlotAndUpdateStatus(slotId: string, timingId: string): Promise<boolean> {
        const filter = {
            _id: slotId,
            "timings._id": timingId
        }
        const result = await slotModel.updateOne(
            filter,
            { $set: { "timings.$.status": "booked" } }
        );
        return result.modifiedCount === 1
    }
}




