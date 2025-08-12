import { SignupDoctorController } from "../../adapters/controllers/authentication/doctorAuthentication/signUpDoctorController";
import { DoctorRepository } from "../../adapters/repository/doctorRepository/doctorRepository";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { SendOtpUseCase } from "../../useCases/Authentication/sendOtpUseCase";
import { DoctorSignupUseCase } from "../../useCases/doctors/doctorAuthentication/signupUseCase";
import { EmailService } from "../services/emailService";
import { HashPassword } from "../services/hashPassword";
import { OtpService } from "../services/otpService";

//-------------------------------------------------------Doctor Signup-----------------------------------------
const doctorRepository = new DoctorRepository()
const hashPassword = new HashPassword()
const doctorSignupUseCase = new DoctorSignupUseCase(doctorRepository, hashPassword)
const otpService = new OtpService()
const emailService = new EmailService()
const userRepository = new UserRepository()
const sendOtpUseCase = new SendOtpUseCase(otpService, emailService, userRepository, doctorRepository)
export const injectedDoctorSignUpController = new SignupDoctorController(sendOtpUseCase, doctorSignupUseCase)