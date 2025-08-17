import { PopulatedBookingForDoctorDTO } from "../../entity/doctor/bookingDTO";
import { BookingEntity } from "../../entity/doctor/bookingEntity";

export interface IbookingRepositoryInterface {
    createBooking(data: BookingEntity): Promise<BookingEntity | null>
    findBookingOfDoctor(doctorId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBookingForDoctorDTO[] | [], totalPages: number }>
}