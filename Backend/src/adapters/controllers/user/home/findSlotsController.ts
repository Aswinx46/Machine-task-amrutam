import { Request, Response } from "express";
import { IfindSlotsUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/slots/findSlotsUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";

export class FindSlotsController {
    constructor(private _findSlotsUseCase: IfindSlotsUseCase) { }
    async handleFindSlots(req: Request, res: Response): Promise<void> {
        try {
            const { searchQuery, page, limit, filter, mode } = req.query
            const parsedpage = parseInt(page?.toString()!, 10) || 1
            const parsedLimit = parseInt(limit?.toString()!, 10) || 5
            const { slots, totalPages } = await this._findSlotsUseCase.findSlots(parsedpage, parsedLimit, searchQuery?.toString() || '', filter?.toString() || '', mode?.toString() || '')
            res.status(HttpStatus.OK).json({ message: "Slots fetched", slots, totalPages })
        } catch (error) {
            console.log('error while finding the slots', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    }
}