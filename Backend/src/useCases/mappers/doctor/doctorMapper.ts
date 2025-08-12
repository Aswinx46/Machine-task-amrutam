import { DoctorDTO } from "../../../domain/entity/doctor/doctorDTO";
import { DoctorEntity } from "../../../domain/entity/doctor/doctorEntity";

export class DoctorMapper {
    static toDTO(data: DoctorEntity): DoctorDTO {
        return {
            _id: data._id,
            address: data.address,
            bio: data.bio,
            clinicName: data.clinicName,
            consultationFee: data.consultationFee,
            email: data.email,
            experienceYears: data.experienceYears,
            isDoctor: data.isDoctor,
            isVerified: data.isVerified,
            location: data.location,
            mode: data.mode,
            name: data.name,
            profileImage: data.profileImage,
            qualification: data.qualification,
            specialization: data.specialization,
            theme: data.theme,
            languages: data.languages,
            rating: data.rating,
            reviewsCount: data.reviewsCount
        }
    }

}