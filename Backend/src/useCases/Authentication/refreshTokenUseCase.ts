import { IdoctorRepository } from "../../domain/interface/repositoryInterfaces/doctorRepositoryInterface"
import { IuserRepository } from "../../domain/interface/repositoryInterfaces/userRepositoryInterface"
import { IjwtServiceInterface } from "../../domain/interface/serviceInterfaces/jwtServiceInterface"
import { IrefreshTokenUseCase } from "../../domain/interface/useCaseInterfaces/Authentication/refreshTokenUseCaseInterface"


export class RefreshTokenUseCase implements IrefreshTokenUseCase {
    constructor(private jwtService: IjwtServiceInterface, private userRepository: IuserRepository, private doctorRepository: IdoctorRepository) { }
    async execute(token: string): Promise<string> {
        const payload = this.jwtService.verifyRefreshToken(token, process.env.REFRESHTOKEN_SECRET_KEY as string)
        if (!payload) throw new Error("Invalid or expired refresh token")
        let user;
        if (payload.role === 'user') {
            user = await this.userRepository.findById(payload.userId)
        } else if (payload.role === 'doctor') {
            user = await this.doctorRepository.findById(payload.userId)
        }
        if (!user) throw new Error("User no longer exists")
        const newAccessToken = this.jwtService.createAccessToken(process.env.ACCESSTOKEN_SECRET_KEY as string, payload.userId, user.role)
        return newAccessToken
    }
}