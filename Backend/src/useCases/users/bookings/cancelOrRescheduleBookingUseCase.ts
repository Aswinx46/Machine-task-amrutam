import { PopulatedBookingDTO } from "../../../domain/entity/doctor/bookingDTO";
import { BookingStatus } from "../../../domain/entity/doctor/bookingEntity";
import { IbookingRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/bookingRepositoryInterface";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IcancelOrRescheduleBookingByUserUseCaseInterface } from "../../../domain/interface/useCaseInterfaces/Client/bookings/cancelOrRescheduleBookingUseCaseInterface";
import { BookingMapper } from "../../mappers/bookings/bookingMapper";

export class CancelOrRescheduleBookingByUserUseCase implements IcancelOrRescheduleBookingByUserUseCaseInterface {
    constructor(private _bookingRepository: IbookingRepositoryInterface, private _slotRepository: IslotRepository) { }
    async cancelOrRescheduleBooking(bookingId: string, status: BookingStatus): Promise<PopulatedBookingDTO> {
        const booking = await this._bookingRepository.findBookingById(bookingId)
        if (!booking) throw new Error("No Booking found in this Booking ID")
        const now = Date.now()
        const startTime = new Date(booking.date).getTime()
        const diffInHours = (startTime - now) / (1000 * 60 * 60)
        if (diffInHours < 24) {
            throw new Error("You cannot cancel or reschedule within 24 hours of the appointment.");
        }
        const updatedBooking = await this._bookingRepository.cancelOrRescheduleBookingFromUserSide(bookingId, status)
        if (!updatedBooking) throw new Error("error while updating the status of booking into cancelled")
        const freeSlot = await this._slotRepository.findSlotAndUpdateStatus(booking.slotId.toString(), booking.timingId.toString(), 'active')
        if (!freeSlot) throw new Error("error while updating the status of the slot into active after cancelling the booking")
        return BookingMapper.ToDTO(updatedBooking)
    }

}