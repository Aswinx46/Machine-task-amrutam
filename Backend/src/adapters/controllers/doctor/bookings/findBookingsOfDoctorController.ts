import { Request, Response } from 'express';
import { IfindBookingsOfDoctorUseCase } from '../../../../domain/interface/useCaseInterfaces/doctor/bookings/findBookingsOfDoctorUseCaseInterface'
import { HttpStatus } from '../../../../framework/constants/httpStatusCode';
import { ERROR_MESSAGES } from '../../../../framework/constants/errorMessages';
export class FindBookingsOfDoctorController {
    constructor(private _findBookingsOfDoctorUseCase: IfindBookingsOfDoctorUseCase) { }
    async handleFindBookingOfDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctorId = (req as any).user.userId
            const { filter, pageNo, limit } = req.query
            const parsedPage = parseInt(pageNo?.toString() || '', 10) || 1
            const parsedLimit = parseInt(limit?.toString() || '', 10) || 5

            const { bookings, totalPages } = await this._findBookingsOfDoctorUseCase.findBookings(doctorId, parsedPage, parsedLimit, filter?.toString() || '')
            res.status(HttpStatus.OK).json({
                message: "BookingsDetailsFetched",
                bookings,
                totalPages
            })
        } catch (error) {
            console.log('error while finding the slots of the doctor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
}