import { PopulatedBooking, PopulatedBookingDTO } from "../../../domain/entity/doctor/bookingDTO";

export class BookingMapper {
    static ToDTO(data: PopulatedBooking): PopulatedBookingDTO {
        return {
            date: data.date,
            doctorId: {
                _id: data.doctorId._id,
                email: data.doctorId.email,
                name: data.doctorId.name,
                profileImage: data.doctorId.profileImage
            },
            endTime:data.endTime,
            mode:data.mode,
            startTime:data.startTime,
            status:data.status,
            userId:data.userId,
            _id:data._id,


        }
    }
}