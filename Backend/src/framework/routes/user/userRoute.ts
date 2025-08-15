import { Request, Response, Router } from "express";
import { injectedBookSlotController, injectedFindSlotsController, injectedSendOtpController, injectedSignupController, injectedUserLoginController } from "../../DI/userDI";
import { injectedRefreshTokenController } from "../../DI/middlewareAndRefreshTokenDI";

export class UserRoute {
    public userRoute: Router
    constructor() {
        this.userRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.userRoute.post('/send-otp', (req: Request, res: Response) => {
            injectedSendOtpController.handleSendOtp(req, res)
        })
        this.userRoute.post('/signup', (req: Request, res: Response) => {
            injectedSignupController.handleUserCreation(req, res)
        })
        this.userRoute.post('/login', (req: Request, res: Response) => {
            injectedUserLoginController.handleUserLogin(req, res)
        })
        this.userRoute.post('/refreshToken', (req: Request, res: Response) => {
            injectedRefreshTokenController.handleRefreshToken(req, res)
        })
        this.userRoute.get('/slots', (req: Request, res: Response) => {
            injectedFindSlotsController.handleFindSlots(req, res)
        })
        this.userRoute.post('/slots/otp/request', (req: Request, res: Response) => {
            injectedBookSlotController.lockSlotAndSendOtp(req, res)
        })
        this.userRoute.post('/slots/otp/verify', (req: Request, res: Response) => {
            injectedBookSlotController.handleVerifyOtpAndCreateBooking(req, res)
        })
    }
}