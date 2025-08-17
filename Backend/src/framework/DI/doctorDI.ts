import { DoctorLoginController } from "../../adapters/controllers/authentication/doctorAuthentication/loginDoctorController";
import { SignupDoctorController } from "../../adapters/controllers/authentication/doctorAuthentication/signUpDoctorController";
import { FindBookingsOfDoctorController } from "../../adapters/controllers/doctor/bookings/findBookingsOfDoctorController";
import { FindSlotsOfADoctorController } from "../../adapters/controllers/doctor/slot/findSlotsOfADoctorController";
import { createSlotController } from "../../adapters/controllers/doctor/slot/slotCreationController";
import { SlotRepository } from "../../adapters/repository/availabilityRepository/slorRepository";
import { BookingRepository } from "../../adapters/repository/bookingRepository/bookingRepository";
import { DoctorRepository } from "../../adapters/repository/doctorRepository/doctorRepository";
import { UserRepository } from "../../adapters/repository/userRepository/userRepository";
import { SendOtpUseCase } from "../../useCases/Authentication/sendOtpUseCase";
import { FindBookingForDoctorUseCase } from "../../useCases/doctors/bookings/findBookingsForDoctorUseCase";
import { DoctorLoginUseCase } from "../../useCases/doctors/doctorAuthentication/loginDoctorUseCase";
import { DoctorSignupUseCase } from "../../useCases/doctors/doctorAuthentication/signupUseCase";
import { FindSlotsOfADoctorUseCase } from "../../useCases/doctors/slot/findSlotsOfADoctorUseCase";
import { CreateSlotUseCase } from "../../useCases/doctors/slot/slotCreationUseCase";
import { EmailService } from "../services/emailService";
import { HashPassword } from "../services/hashPassword";
import { JwtService } from "../services/jwtService";
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

//------------------------------------------------------Doctor Login -------------------------------------------
const jwtService = new JwtService()
const doctorLoginUseCase = new DoctorLoginUseCase(doctorRepository, hashPassword, jwtService)
export const injectedDoctorLoginController = new DoctorLoginController(doctorLoginUseCase)

//-------------------------------------------------------slot creation---------------------------
const slotRepository = new SlotRepository()
const createSlotUseCase = new CreateSlotUseCase(slotRepository)
export const injectedCreateSlotController = new createSlotController(createSlotUseCase)

//--------------------------------------------------Doctor slots fetching--------------------------
const findSlotsOfADoctorUseCase = new FindSlotsOfADoctorUseCase(slotRepository)
export const injectedFindSlotsOfADoctor = new FindSlotsOfADoctorController(findSlotsOfADoctorUseCase)

//---------------------------------------------------find the bookings of the doctor----------------
const bookingRepository = new BookingRepository()
const findBookingsOfDoctorUseCase = new FindBookingForDoctorUseCase(bookingRepository)
export const injectedFindBookingsOfDoctorController = new FindBookingsOfDoctorController(findBookingsOfDoctorUseCase)