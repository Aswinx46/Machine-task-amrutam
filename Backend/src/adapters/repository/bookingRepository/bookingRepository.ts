import mongoose from "mongoose";
import { PopulatedBookingForDoctorDTO } from "../../../domain/entity/doctor/bookingDTO";
import { BookingEntity } from "../../../domain/entity/doctor/bookingEntity";
import { IbookingRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/bookingRepositoryInterface";
import { bookingModel } from "../../../framework/database/models/bookingModel";

export class BookingRepository implements IbookingRepositoryInterface {
    async createBooking(data: BookingEntity): Promise<BookingEntity | null> {
        return await bookingModel.create(data)
    }
    async findBookingOfDoctor(doctorId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBookingForDoctorDTO[] | [], totalPages: number }> {
        const skip = (page - 1) * limit

        const query: any = { doctorId: new mongoose.Types.ObjectId(doctorId) };
        if (filter) query.status = filter;
        const [bookings, totalCount] = await Promise.all([
            bookingModel.find(query).populate({ path: "userId", select: "name email " }).skip(skip).limit(limit).lean<PopulatedBookingForDoctorDTO[]>(),
            bookingModel.countDocuments(query)
        ])
        const totalPages = Math.ceil(totalCount / limit)
        return { bookings, totalPages }
    }
}