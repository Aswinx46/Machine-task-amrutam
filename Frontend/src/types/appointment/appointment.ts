

export interface IavailabilityTime {
    _id?: string
    startTime: Date;
    endTime: Date;
    isBooked: boolean;
    bookedBy?: string;
    consultationDuration: number;
    price: string;
    mode: "online" | "in-person";
    status: "active" | "inactive" | "expired";
}


export interface SlotFormValues {
    startTime: string;
    endTime: string;
    consultationDuration: string;
    price: string;
    mode: "online" | "in-person";
    status: "active" | "inactive" | "expired";
}

export interface IbookedSlotDetails extends Omit<IavailabilityTime, 'bookedBy'> {
    bookedBy: BookedUserDetails
}

export interface BookedUserDetails {
    name: string,
    profileImage: string,
    email: string,
    phone: string
}

export interface SlotEntity {
    _id?: string;
    doctorId: string;
    date: Date;
    timings: IavailabilityTime[];
}

export interface BookingEntity {
    _id?: string;
    doctorId: string;
    ruleId?: string;
    date: Date;
    startTime: Date
    endTime: Date;
    status:  "booked" | "expired" | "completed" | "cancelled"
    mode: "online" | "in-person"
    recurring: boolean
    slotId: string
    userId: string
    timingId: string
}

export type BookingStatus = "booked" | "completed" | "cancelled" | '';

export interface PopulatedBookingForDoctor extends Omit<BookingEntity, "userId"> {
    userId: {
        _id: string,
        name: string,
        email: string
   }
} 

export interface Doctor {
    _id: string;
    name: string;
    specialization: string[];
    bio: string;
    phone: string;
    address: string
}
export interface PopulatedBookingForUser extends Omit<BookingEntity, "doctorId"> {
    doctorId: Doctor
}
// Extended booking interface for dashboard display



export interface SlotWithDoctorDetailsEntity extends Omit<SlotEntity, "doctorId"> {
    doctorId: Doctor
}