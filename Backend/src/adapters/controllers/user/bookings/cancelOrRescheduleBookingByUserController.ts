import { Request, Response } from "express";
import { IcancelOrRescheduleBookingByUserUseCaseInterface } from "../../../../domain/interface/useCaseInterfaces/Client/bookings/cancelOrRescheduleBookingUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";
import { IfindSlotsOfADoctorInUserSideUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/slots/findSlotsOfADoctorUseCaseInterface";

export class CancelOrRescheduleBookingByUserController {
    constructor(private _cancelOrRescheduleBookingByUserUseCase: IcancelOrRescheduleBookingByUserUseCaseInterface, private _findSlotOfDoctorInUserSideUseCase: IfindSlotsOfADoctorInUserSideUseCase) { }
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { status, page, limit } = req.body
            const { bookingId, doctorId } = req.params

            if (!bookingId || !status) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "bookingId and status are required" })
                return
            }
            if (status === 'reschedule' && !doctorId) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "doctorId is required for reschedule" })
                return
            }
            const updateBookingData = await this._cancelOrRescheduleBookingByUserUseCase.cancelOrRescheduleBooking(bookingId, status)
            if (status === 'reschedule') {
                const { slots, totalPages } = await this._findSlotOfDoctorInUserSideUseCase.findSlots(doctorId, page, limit)
                res.status(HttpStatus.OK).json({ message: "Slot rescheduled and new slots are these", slots, totalPages, oldBooking: updateBookingData })
                return
            }
            res.status(HttpStatus.OK).json({ message: "Slot Cancelled", updateBookingData })
        } catch (error) {
            console.log('error while cancelling or rescheduling the booking by user', error)
            res.status(HttpStatus.BAD_REQUEST).json({ message: ERROR_MESSAGES.BAD_REQUEST, error: error instanceof Error ? error.message : 'something went wrong' })
        }
    }
}