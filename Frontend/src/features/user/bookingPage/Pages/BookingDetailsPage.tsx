import type { Doctor, IavailabilityTime, SlotEntity } from "@/types/appointment/appointment";
import SlotBookingComponent from "../components/BookingDetailsCard";

const ExampleUsage: React.FC = () => {
    const sampleSlot: Omit<SlotEntity, 'timings'> = {
        _id: 'slot_123',
        doctorId: 'doc_456',
        date: new Date(2025, 7, 20) // August 20, 2025
    };

    const sampleTiming: IavailabilityTime = {
        startTime: new Date(2025, 7, 20, 10, 0),
        endTime: new Date(2025, 7, 20, 10, 30),   
        isBooked: false,
        consultationDuration: 30,
        price: '500',
        mode: 'online',
        status: 'active'
    };

    const sampleDoctor: Doctor = {
        id: 'doc_456',
        name: 'Dr. Sarah Johnson',
        specialization: ['Cardiology', 'Internal Medicine'],
        address:"fasjkdnf",
        bio:"this is bio",
        phone:'fajsdf'
    };

    const handleBooking = (slotId: string, timingDetails: IavailabilityTime) => {
        console.log('Booking slot:', slotId, timingDetails);
        alert('Appointment booked successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Book Your Appointment
                </h1>
                <SlotBookingComponent
                    slot={sampleSlot}
                    timing={sampleTiming}
                    doctor={sampleDoctor}
                    onBook={handleBooking}
                />
            </div>
        </div>
    );
};

export default ExampleUsage;