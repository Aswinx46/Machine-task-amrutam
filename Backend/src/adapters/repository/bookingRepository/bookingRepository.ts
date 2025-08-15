import { BookingEntity } from "../../../domain/entity/doctor/bookingEntity";
import { IbookingRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/bookingRepositoryInterface";
import { bookingModel } from "../../../framework/database/models/bookingModel";

export class BookingRepository implements IbookingRepositoryInterface {
    async createBooking(data: BookingEntity): Promise<BookingEntity | null> {
        return await bookingModel.create(data)
    }
}