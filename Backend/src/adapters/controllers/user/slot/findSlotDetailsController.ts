import { Request, Response } from "express";
import { IfindDetailsOfASlotUseCase } from "../../../../domain/interface/useCaseInterfaces/Client/slots/findDetailsOfASlotInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";

export class FindSlotDetailsController {
    constructor(private _findSlotDetailsUseCase: IfindDetailsOfASlotUseCase) { }
    async handleFindSlotDetails(req: Request, res: Response): Promise<void> {
        try {
            const { slotId, doctorId, timingId } = req.params
            const slots = await this._findSlotDetailsUseCase.findDetailsOfASlot(slotId, doctorId, timingId)
            console.log('this is the slot data', slots)
            res.status(HttpStatus.OK).json({ message: "Slots fetched", slots })
        } catch (error) {
            console.log('error while finding the details of a slot', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
}