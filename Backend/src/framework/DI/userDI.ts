import { RefreshTokenController } from "../../adapters/controllers/authentication/sendOtpAndRefreshToken/refreshTokenController";
import { SendOtpController } from "../../adapters/controllers/authentication/sendOtpAndRefreshToken/sendOtpController";
import { UserLoginController } from "../../adapters/controllers/authentication/userAuthentication/login/userLoginController";
import { SignupController } from "../../adapters/controllers/authentication/userAuthentication/signup/SignupController";
import { DoctorRepository } from "../../adapters/repository/doctorRepository/doctorRepository";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { RefreshTokenUseCase } from "../../useCases/Authentication/refreshTokenUseCase";
import { SendOtpUseCase } from "../../useCases/Authentication/sendOtpUseCase";
import { SignupUseCase } from "../../useCases/users/userAuthentication/signupUserUseCase";
import { UserLoginUseCase } from "../../useCases/users/userAuthentication/userLoginUseCase";
import { EmailService } from "../services/emailService";
import { HashPassword } from "../services/hashPassword";
import { JwtService } from "../services/jwtService";
import { OtpService } from "../services/otpService";

//-------------------------------------sendOtp User ---------------------------------
const otpService = new OtpService()
const emailService = new EmailService()
const userRepository = new UserRepository()
const doctorRepository = new DoctorRepository()
const sendOtpUseCase = new SendOtpUseCase(otpService, emailService, userRepository,doctorRepository)
export const injectedSendOtpController = new SendOtpController(sendOtpUseCase)

//-------------------------------------verify otp and create user -------------------------------
const hashPassword = new HashPassword()
const signupUseCase = new SignupUseCase(userRepository, hashPassword)
export const injectedSignupController = new SignupController(sendOtpUseCase, signupUseCase)


//------------------------------------- User Login ---------------------------------
const jwtService = new JwtService()
const userLoginUseCase = new UserLoginUseCase(userRepository, jwtService, hashPassword)
export const injectedUserLoginController = new UserLoginController(userLoginUseCase)

