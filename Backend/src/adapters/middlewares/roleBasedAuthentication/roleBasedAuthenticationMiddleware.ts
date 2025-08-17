import { NextFunction, Request, Response } from "express"
import { HttpStatus } from "../../../framework/constants/httpStatusCode"
import { ERROR_MESSAGES } from "../../../framework/constants/errorMessages"

export const roleBasedAuthenticationMiddleware = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user
        if (!user) {
            res.status(HttpStatus.UNAUTHORIZED).json({ error: ERROR_MESSAGES.UNAUTHORIZED })
            return
        }
        if (user.role !== role) {
            res.status(HttpStatus.FORBIDDEN).json({ error: ERROR_MESSAGES.FORBIDDEN })
            return
        }
        next()
    }
}