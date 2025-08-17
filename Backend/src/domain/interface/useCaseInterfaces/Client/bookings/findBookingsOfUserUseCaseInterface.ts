import { PopulatedBookingDTO } from "../../../../entity/doctor/bookingDTO";

export interface IfindBookingsOfUserUseCase {
    findBookingsOfUser(userId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBookingDTO[], totalPages: number }>
}