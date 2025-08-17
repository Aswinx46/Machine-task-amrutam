import { PopulatedBookingForDoctorDTO } from "../../../domain/entity/doctor/bookingDTO";
import { IbookingRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/bookingRepositoryInterface";
import { IfindBookingsOfDoctorUseCase } from "../../../domain/interface/useCaseInterfaces/doctor/bookings/findBookingsOfDoctorUseCaseInterface";

export class FindBookingForDoctorUseCase implements IfindBookingsOfDoctorUseCase {
    constructor(private _bookingDatabase: IbookingRepositoryInterface) { }
    async findBookings(doctorId: string, page: number, limit: number, filter?: string): Promise<{ bookings: PopulatedBookingForDoctorDTO[] | []; totalPages: number; }> {
        const { bookings, totalPages } = await this._bookingDatabase.findBookingOfDoctor(doctorId, page, limit, filter)
        return { bookings, totalPages }
    }
}