import { Request, Response } from "express";
import { IslotCreationUseCase } from "../../../../domain/interface/useCaseInterfaces/doctor/slotCreations/slotCreationsUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";
import { slotCreationSchema } from "../../../../framework/validator/doctor/slotCreationValidator";

export class createSlotController {
    constructor(private _createSlotUseCase: IslotCreationUseCase) { }
    async handleCreateSlot(req: Request, res: Response): Promise<void> {
        try {
            const { data } = req.body
            const validateData = slotCreationSchema.safeParse(data)
            if (!validateData.success) {
                const allMessages = Object.values(validateData.error.flatten().fieldErrors).flat();
                res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid input data", error: allMessages.toString() })
                return
            }
            const createdSlot = await this._createSlotUseCase.createSlot(data)
            res.status(HttpStatus.CREATED).json({ message: "Slot Created", createdSlot })
        } catch (error) {
            console.log('error while creating the slot', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'something went wrong'
            })
        }
    }
}