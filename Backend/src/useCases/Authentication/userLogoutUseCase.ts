import { IjwtServiceInterface } from "../../domain/interface/serviceInterfaces/jwtServiceInterface";
import { IredisService } from "../../domain/interface/serviceInterfaces/redisServiceInterface";
import { IuserLogoutUseCase } from "../../domain/interface/useCaseInterfaces/Authentication/userLogoutUseCaseInterface";

export class UserLogoutUseCase implements IuserLogoutUseCase {
    constructor(private _jwtService: IjwtServiceInterface, private _redisService: IredisService) { }
    async execute(token: string): Promise<boolean> {
        const decode = await this._jwtService.tokenDecode(token)
        const exp = decode?.exp
        if (!exp) throw new Error("Invalid Token")
        const currentTime = Math.floor(Date.now() / 1000)
        const ttl = exp - currentTime
        if (ttl > 0) {
            await this._redisService.set(`blackList:${token}`, ttl, 'true')
            return true
        }
        return false
    }
}