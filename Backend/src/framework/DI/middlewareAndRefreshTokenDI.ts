import { RefreshTokenController } from "../../adapters/controllers/authentication/sendOtpAndRefreshToken/refreshTokenController";
import { tokenBlackListCheckingMiddleware } from "../../adapters/middlewares/tokenValidation/tokenBlackListingValidation";
import { tokenTimeExpiryValidationMiddleware } from "../../adapters/middlewares/tokenValidation/tokenExpiryValidation";
import { DoctorRepository } from "../../adapters/repository/doctorRepository/doctorRepository";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { RefreshTokenUseCase } from "../../useCases/Authentication/refreshTokenUseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";
import { TokenService } from "../services/tokenService";

const jwtService = new JwtService()
export const injectedTokenExpiryValidationMiddleware = tokenTimeExpiryValidationMiddleware(jwtService)
const redisService = new RedisService()
const tokenService = new TokenService(redisService)
export const injectedTokenBlacklistCheckingMiddleware = tokenBlackListCheckingMiddleware(tokenService)

//---------------------------------------------Refresh token--------------------------
//------------------------------------------refreshToken ----------------------------------
const userRepository = new UserRepository()
const doctorRepository = new DoctorRepository()
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService, userRepository, doctorRepository)
export const injectedRefreshTokenController = new RefreshTokenController(refreshTokenUseCase)