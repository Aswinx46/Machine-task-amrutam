import { BookingEntity } from "../../../../entity/doctor/bookingEntity";

export interface IBookSlotUseCase {
    lockSlotAndSendOtp(email: string, slotId: string, userId: string, timingId: string): Promise<void>
    verifyOtpAndCreateBooking(data: BookingEntity, otp: string, email: string): Promise<void>
    checkIsSlotLocked(key: string,userId:string): Promise<void>
    resendOtp(email: string): Promise<void>
}