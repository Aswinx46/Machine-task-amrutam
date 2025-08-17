import { PopulatedBookingDTO } from "../../../../entity/doctor/bookingDTO";
import { BookingStatus } from "../../../../entity/doctor/bookingEntity";

export interface IcancelOrRescheduleBookingByUserUseCaseInterface {
    cancelOrRescheduleBooking(bookingId: string, status: BookingStatus): Promise<PopulatedBookingDTO>
}