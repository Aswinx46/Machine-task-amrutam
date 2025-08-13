import { Request, Response, Router } from "express";
import { injectedRefreshTokenController } from "../../DI/userDI";

export class AuthRouter {
    public AuthRouter: Router
    constructor() {
        this.AuthRouter = Router()
        this.setRoute()
    }
    private setRoute() {
        this.AuthRouter.post('/refresh-token', (req: Request, res: Response) => {
            injectedRefreshTokenController.handleRefreshToken(req, res)
        })
    }
}