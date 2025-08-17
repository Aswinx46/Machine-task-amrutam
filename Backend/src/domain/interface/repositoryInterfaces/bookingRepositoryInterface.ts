import { PopulatedBooking, PopulatedBookingForDoctorDTO } from "../../entity/doctor/bookingDTO";
import { BookingEntity, BookingStatus } from "../../entity/doctor/bookingEntity";

export interface IbookingRepositoryInterface {
    createBooking(data: BookingEntity): Promise<BookingEntity | null>
    findBookingOfDoctor(doctorId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBookingForDoctorDTO[] | [], totalPages: number }>
    findBookingsOfUser(userId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBooking[], totalPages: number }>
    cancelOrRescheduleBookingFromUserSide(bookingId: string, status: BookingStatus): Promise<PopulatedBooking | null>
    findBookingById(bookingId: string): Promise<BookingEntity | null>
}