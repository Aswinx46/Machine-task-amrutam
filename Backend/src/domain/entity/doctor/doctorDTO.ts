import { DoctorEntity } from "./doctorEntity";

export interface DoctorDTO extends Omit<DoctorEntity, 'password' | '_v' | 'createdAt' | 'updatedAt'> { }