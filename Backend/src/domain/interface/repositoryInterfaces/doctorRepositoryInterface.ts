import { DoctorEntity } from "../../entity/doctor/doctorEntity";

export interface IdoctorRepository {
    findById(id: string): Promise<DoctorEntity | null>
    createDoctor(data: DoctorEntity): Promise<DoctorEntity | null>
    findByEmail(email: string): Promise<DoctorEntity | null>
}