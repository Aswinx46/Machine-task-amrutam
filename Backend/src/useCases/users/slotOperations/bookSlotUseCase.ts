import { BookingEntity } from "../../../domain/entity/doctor/bookingEntity";
import { IbookingRepositoryInterface } from "../../../domain/interface/repositoryInterfaces/bookingRepositoryInterface";
import { IslotRepository } from "../../../domain/interface/repositoryInterfaces/slotRepositoryInterface";
import { IemailService } from "../../../domain/interface/serviceInterfaces/emailServiceInterface";
import { IotpService } from "../../../domain/interface/serviceInterfaces/otpServiceInterface";
import { IredisService } from "../../../domain/interface/serviceInterfaces/redisServiceInterface";
import { IBookSlotUseCase } from "../../../domain/interface/useCaseInterfaces/Client/slots/bookSlotUseCaseInterface";

export class BookSlotUseCase implements IBookSlotUseCase {
    constructor(private _redisService: IredisService, private _emailService: IemailService, private _otpService: IotpService, private _slotRepository: IslotRepository, private _bookingRepository: IbookingRepositoryInterface) { }
    async lockSlotAndSendOtp(email: string, slotId: string, userId: string, timingId: string): Promise<void> {
        const key = `lock:slot:${slotId}:timing:${timingId}`
        await this.checkIsSlotLocked(key, userId)
        const slotStatus = await this._slotRepository.getStatusOfSlot(slotId, timingId)
        if (!slotStatus) throw new Error("No slot found in this ID")
        if (slotStatus !== 'active') throw new Error("Slot is not Active now")
        const lockSlot = await this._redisService.lockSlot(key, userId, 300)
        if (lockSlot !== 'OK') throw new Error("❌ Slot already taken")
        const otp = this._otpService.genarateOtp()
        await this._otpService.storeOtp(email, otp)
        await this._emailService.sendEmailOtp(email, otp)
    } //locking the slot by checking if it is already locked or the slot is already booked


    async verifyOtpAndCreateBooking(data: BookingEntity, otp: string, email: string): Promise<void> {
        const key = `lock:slot:${data.slotId}:timing:${data.timingId}`
        console.log('this is the otp',otp)
        const verifyOtp = await this._otpService.verifyOtp(email, otp)
        if (!verifyOtp) throw new Error("Invalid OTP")
        const userId = await this._redisService.get(key)
        if (!userId || userId !== data.userId) throw new Error("Slot is not reserved by you")
        const slotStatus = await this._slotRepository.getStatusOfSlot(data.slotId.toString(), data.timingId.toString())
        if (!slotStatus) throw new Error("No slot found in this ID")
        if (slotStatus !== 'active') throw new Error("Slot is not Active now")
        const createBooking = await this._bookingRepository.createBooking(data)
        if (!createBooking) throw new Error("Error while creating booking")
        const changeStatusOfSlot = await this._slotRepository.findSlotAndUpdateStatus(data.slotId.toString(), data.timingId.toString())
        if (!changeStatusOfSlot) throw new Error("No slot found for changing the status")
        if (createBooking && changeStatusOfSlot) await this._redisService.del(key)
    } // verifyting the otp and creating the booking and changing the status of the slot into booked


    async checkIsSlotLocked(key: string, userId: string): Promise<void> {
        const isSlotIsLocked = await this._redisService.get(key)
        if (isSlotIsLocked && isSlotIsLocked !== userId) throw new Error("Slot is already Reserved")
    }


    async resendOtp(email: string): Promise<void> {
        const otp = this._otpService.genarateOtp()
        await this._otpService.storeOtp(email, otp)
        await this._emailService.sendEmailOtp(email, otp)
    }
}