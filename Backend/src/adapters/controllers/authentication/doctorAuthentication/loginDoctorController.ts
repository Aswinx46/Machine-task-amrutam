import { Request, Response } from "express";
import { IdoctorLoginUseCase } from "../../../../domain/interface/useCaseInterfaces/doctor/doctorAuthentication/doctorLoginUseCaseInterface";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";
import { loginSchema } from "../../../../framework/validator/user/loginValidator";
import { setTokenInCookie } from "../../../../framework/services/setTokenInCookie";

export class DoctorLoginController {
    constructor(private _DoctorLoginUseCase: IdoctorLoginUseCase) { }
    async handleLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const validateInput = loginSchema.safeParse({ email, password })
            if (!validateInput.success) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Invalid input data",
                    error: validateInput.error.flatten().fieldErrors
                })
                return
            }
            const { doctor, accessToken, refreshToken } = await this._DoctorLoginUseCase.execute(email, password)
            setTokenInCookie(res, refreshToken)
            res.status(HttpStatus.OK).json({ message: "Login Successfull", doctor, accessToken })
        } catch (error) {
            console.log('error while handling the doctor login', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    }
}