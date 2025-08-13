import { DoctorDTO } from "../../../domain/entity/doctor/doctorDTO";
import { DoctorEntity } from "../../../domain/entity/doctor/doctorEntity";
import { IdoctorRepository } from "../../../domain/interface/repositoryInterfaces/doctorRepositoryInterface";
import { IhashPassword } from "../../../domain/interface/serviceInterfaces/hashPasswordInterface";
import { IdoctorSignupUseCase } from "../../../domain/interface/useCaseInterfaces/doctor/doctorAuthentication/doctorSignupUseCaseInterface";
import { DoctorMapper } from "../../mappers/doctor/doctorMapper";

export class DoctorSignupUseCase implements IdoctorSignupUseCase {
    constructor(private _doctorRepository: IdoctorRepository, private _hashPassword: IhashPassword) { }
    async execute(data: DoctorEntity): Promise<DoctorDTO> {
        const oldDoctor = await this._doctorRepository.findByEmail(data.email)
        if (oldDoctor) throw new Error("Email already exist")
        const hashedPassword = await this._hashPassword.hashPassword(data.password!)
        if (!hashedPassword) throw new Error("Error while hashing password")
        data.isDoctor = true
        data.password = hashedPassword
        const newDoctor = await this._doctorRepository.createDoctor(data)
        if (!newDoctor) throw new Error("Error while creating doctor")
        return DoctorMapper.toDTO(newDoctor)
    }
}