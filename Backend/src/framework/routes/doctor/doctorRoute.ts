import { Request, Response, Router } from "express";
import { injectedCreateSlotController, injectedDoctorLoginController, injectedDoctorSignUpController, injectedFindSlotsOfADoctor } from "../../DI/doctorDI";
import { injectedSendOtpController } from "../../DI/userDI";
import { tokenTimeExpiryValidationMiddleware } from "../../../adapters/middlewares/tokenValidation/tokenExpiryValidation";
import { tokenBlackListCheckingMiddleware } from "../../../adapters/middlewares/tokenValidation/tokenBlackListingValidation";
import { roleBasedAuthenticationMiddleware } from "../../../adapters/middlewares/roleBasedAuthentication/roleBasedAuthenticationMiddleware";

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
        this.DoctorRouter.route('/slot').post(tokenTimeExpiryValidationMiddleware, tokenBlackListCheckingMiddleware, roleBasedAuthenticationMiddleware('doctor'), (req: Request, res: Response) => {
            injectedCreateSlotController.handleCreateSlot(req, res)
        }).get(tokenTimeExpiryValidationMiddleware, tokenBlackListCheckingMiddleware, roleBasedAuthenticationMiddleware('doctor'), (req: Request, res: Response) => {
            injectedFindSlotsOfADoctor.execute(req, res)
        })
    }
}