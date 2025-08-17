import { PopulatedBookingForDoctorDTO } from "../../../../entity/doctor/bookingDTO";

export interface IfindBookingsOfDoctorUseCase {
    findBookings(doctorId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBookingForDoctorDTO[] | [], totalPages: number }>
}