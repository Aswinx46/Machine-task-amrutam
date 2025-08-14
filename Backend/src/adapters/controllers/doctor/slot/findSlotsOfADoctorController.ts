import { Request, Response } from "express";
import { IfindSlotsOfADoctor } from "../../../../domain/interface/useCaseInterfaces/doctor/slotCreations/findSlotsOfADoctorUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";

export class FindSlotsOfADoctorController {
    constructor(private _findSlotsOfADoctorUseCase: IfindSlotsOfADoctor) { }
    async execute(req: Request, res: Response): Promise<void> {
        try {
            console.log('inside controller')
            const { page, limit } = req.query
            const parsedPage = parseInt(page?.toString()!, 10) || 1
            const parsedLimit = parseInt(limit?.toString()!, 10) || 5
            const userId = (req as any).user.userId
            const { slots, totalPages } = await this._findSlotsOfADoctorUseCase.findSlots(userId, parsedPage, parsedLimit)
            res.status(HttpStatus.OK).json({
                message: "Slots Fetched",
                slots, totalPages
            })
        } catch (error) {
            console.log('error while fetching the slots of a user', error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                error: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    }
}