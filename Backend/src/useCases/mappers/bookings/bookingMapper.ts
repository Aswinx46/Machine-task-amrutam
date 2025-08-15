import { PopulatedBooking, populatedBookingDTO } from "../../../domain/entity/doctor/bookingDTO";

export class BookingMapper {
    static ToDTO(data: PopulatedBooking): populatedBookingDTO {
        return {
            date: data.date,
            doctorId: {
                _id: data.doctorId._id,
                email: data.doctorId.email,
                name: data.doctorId.name,
                profileImage: data.doctorId.profileImage
            },
            endTime: data.timingId.endTime.toString(),
            slotId: data.timingId._id,
            startTime: data.timingId.startTime.toString(),
            status: data.timingId.status,
            timingId: {
                _id: data.timingId._id,
                consultationDuration: data.timingId.consultationDuration,
                endTime: data.timingId.endTime,
                mode: data.timingId.mode,
                price: data.timingId.price,
                startTime: data.timingId.startTime,
                status: data.timingId.status
            },
            userId: data.userId,
            _id: data._id,
            recurring: data.recurring
        }
    }
}