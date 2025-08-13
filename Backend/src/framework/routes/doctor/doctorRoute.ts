import { Request, Response, Router } from "express";
import { injectedDoctorLoginController, injectedDoctorSignUpController } from "../../DI/doctorDI";
import { injectedSendOtpController } from "../../DI/userDI";

export class DoctorRoute {
    public DoctorRouter: Router
    constructor() {
        this.DoctorRouter = Router()
        this.setRoutes()
    }
    private setRoutes() {
        this.DoctorRouter.post('/signup', (req: Request, res: Response) => {
            injectedDoctorSignUpController.execute(req, res)
        })
        this.DoctorRouter.post('/send-otp', (req: Request, res: Response) => {
            injectedSendOtpController.handleSendOtp(req, res)
        })
        this.DoctorRouter.post('/login', (req: Request, res: Response) => {
            injectedDoctorLoginController.handleLogin(req, res)
        })
    }
}