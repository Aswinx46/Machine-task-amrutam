import type {  IavailabilityTime, SlotEntity } from "@/types/appointment/appointment";
import SlotBookingComponent from "../components/BookingDetailsCard";
import { useParams } from "react-router-dom";
import { useFindSlotDetails } from "../hooks/bookingHooks";
import { useEffect, useState } from "react";
import type{ DoctorEntity } from "@/types/Doctor/DoctorType";

const ExampleUsage: React.FC = () => {
    const params = useParams()
    const findSlotDetailsMutate = useFindSlotDetails()
    const [slot, setSlot] = useState<SlotEntity | null>(null)
    const [timing, setTiming] = useState<IavailabilityTime | null>(null)
    const [doctor, setDoctor] = useState<DoctorEntity | null>(null)
    useEffect(() => {
        if (!params.slotId || !params.doctorId || !params.timingId) return
        findSlotDetailsMutate.mutate({ slotId: params.slotId, doctorId: params.doctorId, timingId: params.timingId }, {
            onSuccess: (data) => {
                console.log('this is the slot data', data)
                setSlot(data.slots)
                setTiming(data.slots.timings)
                setDoctor(data.slots.doctorId)
            },
            onError: (err) => {
                console.log('error while finding the details o fthe slot', err)
            }
        })
    }, [])

    const handleBooking = (slotId: string, timingDetails: IavailabilityTime) => {
        console.log('Booking slot:', slotId, timingDetails);
        alert('Appointment booked successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-100 ">

                {slot && doctor && timing && <SlotBookingComponent
                    slot={slot}
                    timing={timing}
                    doctor={doctor}
                    onBook={handleBooking}
                />}
        
        </div>
    );
};

export default ExampleUsage;