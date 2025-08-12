import { DoctorDTO } from "../../../../entity/doctor/doctorDTO";
import { DoctorEntity } from "../../../../entity/doctor/doctorEntity";

export interface IdoctorSignupUseCase {
    execute(data: DoctorEntity): Promise<DoctorDTO>
}