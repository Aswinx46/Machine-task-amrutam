

export interface IavailabilityTime {
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

export interface IbookedSlotDetails extends Omit<IavailabilityTime,'bookedBy'>{
    bookedBy:BookedUserDetails
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
    startTime: string;
    endTime: string;
    status: "available" | "booked" | "expired";
    recurring: boolean;
    patientName?: string;
    patientEmail?: string;
    patientPhone?: string;
    consultationType?: "online" | "in-person";
    notes?: string;
}

export type BookingStatus = "booked" | "completed" | "cancelled";
export type FilterStatus = "all" | BookingStatus;

// Extended booking interface for dashboard display
export interface DashboardBooking extends Omit<BookingEntity, "status"> {
    _id: string;
    status: BookingStatus;
    patientName: string;
    patientEmail?: string;
    patientPhone?: string;
    consultationType: "online" | "in-person"
}