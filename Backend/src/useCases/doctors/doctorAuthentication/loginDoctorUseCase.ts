import { DoctorDTO } from "../../../domain/entity/doctor/doctorDTO";
import { IdoctorRepository } from "../../../domain/interface/repositoryInterfaces/doctorRepositoryInterface";
import { IhashPassword } from "../../../domain/interface/serviceInterfaces/hashPasswordInterface";
import { IjwtServiceInterface } from "../../../domain/interface/serviceInterfaces/jwtServiceInterface";
import { IdoctorLoginUseCase } from "../../../domain/interface/useCaseInterfaces/doctor/doctorAuthentication/doctorLoginUseCaseInterface";

export class DoctorLoginUseCase implements IdoctorLoginUseCase {
    constructor(private _doctorRepository: IdoctorRepository,  private hashPassword: IhashPassword, private jwtService: IjwtServiceInterface) { }
    async execute(email: string, password: string): Promise<{ doctor: DoctorDTO, accessToken: string, refreshToken: string }> {
        const doctor = await this._doctorRepository.findByEmail(email)
        if (!doctor || doctor.role !== 'doctor') throw new Error("No Doctor Found in this Email")
        const comparePassword = await this.hashPassword.comparePassword(password, doctor.password!)
        if (!comparePassword) throw new Error("Invalid Password")
        const accessSecretKey = process.env.ACCESSTOKEN_SECRET_KEY
        const refreshSecretKey = process.env.REFRESHTOKEN_SECRET_KEY
        if (!accessSecretKey || !refreshSecretKey) throw new Error("No token secrets provided")
        const accessToken = this.jwtService.createAccessToken(accessSecretKey, doctor._id?.toString()!, doctor.role)
        const refreshToken = this.jwtService.createRefreshToken(refreshSecretKey, doctor._id?.toString()!, doctor.role)
        return { doctor, accessToken, refreshToken }
    }
}