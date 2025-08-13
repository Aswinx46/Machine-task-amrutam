import { DoctorDTO } from "../../../../entity/doctor/doctorDTO";


export interface IdoctorLoginUseCase {
    execute(email: string, password: string): Promise<{ doctor: DoctorDTO, accessToken: string, refreshToken: string }>
}