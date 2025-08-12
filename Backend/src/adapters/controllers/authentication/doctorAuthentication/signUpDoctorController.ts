import { Request, Response } from "express";
import { HttpStatus } from "../../../../framework/constants/httpStatusCode";
import { ERROR_MESSAGES } from "../../../../framework/constants/errorMessages";
import { doctorSignupSchemaValidator } from "../../../../framework/validator/doctor/signupDoctorValidator";
import { IsendOtpUseCase } from "../../../../domain/interface/useCaseInterfaces/Authentication/sendOtpUseCaseInterface";
import { IdoctorSignupUseCase } from "../../../../domain/interface/useCaseInterfaces/doctor/doctorAuthentication/doctorSignupUseCaseInterface";

export class SignupDoctorController {
    constructor(private _sendOtpUseCase: IsendOtpUseCase, private signUpDoctorUseCase: IdoctorSignupUseCase) { }
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { data, enteredOtp } = req.body
            const validateDoctor = doctorSignupSchemaValidator.safeParse(data)
            if (!validateDoctor.success) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Validation Failed",
                    error: validateDoctor.error.flatten().fieldErrors
                })
                return
            }
            const verifyOtp = await this._sendOtpUseCase.verifyOtp(data.email, enteredOtp)
            if (!verifyOtp) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: ERROR_MESSAGES.BAD_REQUEST,
                    error: 'invalid OTP'
                })
                return
            }
            const createdDoctor = await this.signUpDoctorUseCase.execute(data)
            res.status(HttpStatus.CREATED).json({ message: "Account created", doctor: createdDoctor })
        } catch (error) {
            console.log('error while signing up doctor', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : ERROR_MESSAGES.BAD_REQUEST
            })
        }
    }
}