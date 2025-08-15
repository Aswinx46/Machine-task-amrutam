import { Request, Response } from "express";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";
import { IBookSlotUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/slots/bookSlotUseCaseInterface";
import { bookingDataValidator } from "../../../../framework/validator/user/bookingValidator";

export class BookSlotController {
    constructor(private _bookSlotUseCase: IBookSlotUseCase) { }
    async lockSlotAndSendOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email, slotId, timingId } = req.body
            const userId = (req as any).user.userId
            await this._bookSlotUseCase.lockSlotAndSendOtp(email, slotId, userId, timingId)
            res.status(HttpStatus.OK).json({ message: "OTP sended" })
        } catch (error) {
            console.log('error while locking the slot and sending the otp', error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
    async handleVerifyOtpAndCreateBooking(req: Request, res: Response): Promise<void> {
        try {
            const { data, enteredOtp, email } = req.body
            const verifyData = bookingDataValidator.safeParse(data)
            if (!verifyData.success) {
                const messages = Object.values(verifyData.error.flatten().fieldErrors).flat();
                res.status(HttpStatus.BAD_REQUEST).json({ message: "invalid input data", error: messages.toString() })
                return
            }
            await this._bookSlotUseCase.verifyOtpAndCreateBooking(data, enteredOtp, email)
            res.status(HttpStatus.CREATED).json({ message: "Booking Created" })
        } catch (error) {
            console.log('error while verifying the otp and creating the booking', error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
}