import { BookingEntity } from "../../entity/doctor/bookingEntity";

export interface IbookingRepositoryInterface {
    createBooking(data: BookingEntity): Promise<BookingEntity | null>
}