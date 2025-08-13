import { DoctorEntity } from "../../../domain/entity/doctor/doctorEntity";
import { IdoctorRepository } from "../../../domain/interface/repositoryInterfaces/doctorRepositoryInterface";
import { doctorModel } from "../../../framework/database/models/doctorModel";

export class DoctorRepository implements IdoctorRepository {
    async createDoctor(data: DoctorEntity): Promise<DoctorEntity | null> {
        return await doctorModel.create(data)
    }
    async findByEmail(email: string): Promise<DoctorEntity | null> {
        return await doctorModel.findOne({ email })
    }
    async findById(id: string): Promise<DoctorEntity | null> {
        return await doctorModel.findById(id)
    }
}