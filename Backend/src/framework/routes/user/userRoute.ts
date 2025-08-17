import { Request, Response, Router } from "express";
import { injectedBookSlotController, injectedCancelOrRescheduleBookingController, injectedFindBookingsOfUserController, injectedFindSlotDetailsController, injectedFindSlotsController, injectedSendOtpController, injectedSignupController, injectedUserLoginController, injectedUserLogoutController } from "../../DI/userDI";
import { injectedRefreshTokenController, injectedTokenBlacklistCheckingMiddleware, injectedTokenExpiryValidationMiddleware } from "../../DI/middlewareAndRefreshTokenDI";

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
        this.userRoute.post('/slots/otp/request', injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddleware, (req: Request, res: Response) => {
            injectedBookSlotController.lockSlotAndSendOtp(req, res)
        })
        this.userRoute.post('/slots/otp/verify', injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddleware, (req: Request, res: Response) => {
            injectedBookSlotController.handleVerifyOtpAndCreateBooking(req, res)
        })
        this.userRoute.get('/slot/:slotId/:doctorId/:timingId', (req: Request, res: Response) => {
            injectedFindSlotDetailsController.handleFindSlotDetails(req, res)
        })
        this.userRoute.get('/bookings', injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindBookingsOfUserController.handleFindBookingOfUser(req, res)
        })
        this.userRoute.patch('/bookings/:bookingId/:doctorId', injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddleware, (req: Request, res: Response) => {
            injectedCancelOrRescheduleBookingController.execute(req, res)
        })
        this.userRoute.post('/logout', injectedTokenExpiryValidationMiddleware, injectedTokenBlacklistCheckingMiddleware, (req: Request, res: Response) => {
            injectedUserLogoutController.handleUserLogoutUseCase(req, res)
        })
    }
}