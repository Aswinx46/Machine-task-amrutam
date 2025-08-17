import { Request, Response } from "express";
import { IfindBookingsOfUserUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/bookings/findBookingsOfUserUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";

export class FindBookingsOfUserController {
    constructor(private _findBookingsOfUserUseCase: IfindBookingsOfUserUseCase) { }
    async handleFindBookingOfUser(req: Request, res: Response): Promise<void> {
        try {
            const { page, limit, filter } = req.query
            const userId = (req as any).user.userId
            const parsedPage = parseInt(page?.toString() || '', 10) || 1
            const parsedLimit = parseInt(limit?.toString() || '', 10) || 5
            const { bookings, totalPages } = await this._findBookingsOfUserUseCase.findBookingsOfUser(userId, parsedPage, parsedLimit, filter?.toString())
            res.status(HttpStatus.OK).json({
                message: "Bookings Fetched",
                bookings,
                totalPages
            })
        } catch (error) {
            console.log('error while finding the bookings of the user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
}