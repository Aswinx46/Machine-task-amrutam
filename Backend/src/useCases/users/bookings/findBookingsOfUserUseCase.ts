import { PopulatedBookingDTO } from "../../../domain/entity/doctor/bookingDTO";
import { IbookingRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/bookingRepositoryInterface";
import { IfindBookingsOfUserUseCase } from "../../../domain/interface/useCaseInterfaces/Client/bookings/findBookingsOfUserUseCaseInterface";
import { BookingMapper } from "../../mappers/bookings/bookingMapper";

export class FindBookingsOfUserUseCase implements IfindBookingsOfUserUseCase {
    constructor(private _bookingsRepository: IbookingRepositoryInterface) { }
    async findBookingsOfUser(userId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBookingDTO[]; totalPages: number; }> {
        const { bookings, totalPages } = await this._bookingsRepository.findBookingsOfUser(userId, page, limit, filter)
        const mappedBooking = bookings.map((item) => BookingMapper.ToDTO(item))
        return { bookings: mappedBooking, totalPages }
    }
}