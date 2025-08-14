import { useState } from "react";

import type { DashboardBooking, FilterStatus, SlotEntity } from "@/types/appointment/appointment";
import { DoctorHeader } from "../component/DoctorHeader";
import { BookingFilters } from "../component/BookingFilters";
import { BookingCard } from "../component/BookingCard";
import { CreateSlotModal } from "../component/CreateSlotModal";
import { toast } from "sonner";
import { useCreateSlot } from "../hooks/slotHook";
import { useSelector } from "react-redux";
import type { RootState } from "@/reduxstrore/store";
import { checkDateConflict } from "../utils/checkDateConflict";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data - replace with actual API calls
const mockBookings: DashboardBooking[] = [
    {
        _id: "1",
        doctorId: "doc1",
        date: new Date(),
        startTime: "09:00",
        endTime: "09:30",
        status: "booked",
        recurring: false,
        patientName: "John Smith",
        patientEmail: "john@example.com",
        patientPhone: "+1 (555) 123-4567",
        consultationType: "online",
        notes: "Follow-up consultation for diabetes management"
    },
    {
        _id: "2",
        doctorId: "doc1",
        date: new Date(),
        startTime: "10:00",
        endTime: "10:30",
        status: "completed",
        recurring: false,
        patientName: "Sarah Johnson",
        patientEmail: "sarah@example.com",
        patientPhone: "+1 (555) 234-5678",
        consultationType: "in-person",
        notes: "Annual check-up"
    },
    {
        _id: "3",
        doctorId: "doc1",
        date: new Date(),
        startTime: "11:00",
        endTime: "11:30",
        status: "cancelled",
        recurring: false,
        patientName: "Mike Wilson",
        patientEmail: "mike@example.com",
        patientPhone: "+1 (555) 345-6789",
        consultationType: "online"
    }
];

const DoctorHomePage = () => {
    const [bookings, setBookings] = useState(mockBookings);
    const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
    const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);
    const createSlotMutation = useCreateSlot()
    const doctor = useSelector((state: RootState) => state.doctor.doctor)
    const navigate = useNavigate()
    if (!doctor) return
    const counts = {
        all: bookings.length,
        booked: bookings.filter(b => b.status === "booked").length,
        completed: bookings.filter(b => b.status === "completed").length,
        cancelled: bookings.filter(b => b.status === "cancelled").length,
    };

    const stats = {
        todayBookings: counts.booked,
        totalSlots: 12, // Mock data
        completedToday: counts.completed,
    };



    const handleCreateSlot = (slot: Omit<SlotEntity, "_id">) => {
        slot.doctorId = doctor?._id
        if (checkDateConflict(slot)) {
            toast("Date Conflict Found")
            return
        }
        createSlotMutation.mutate(slot, {
            onSuccess: (data) => {
                // setBookings((prev)=>[...prev,data.createdSlot])
                console.log('this is the data after creating the slot', data)
                toast('Slot Created')
            },
            onError: (err) => {
                console.log('error while creating the slot', err)
                toast(err.message)
            }
        })

    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <DoctorHeader
                    doctorName={doctor.name}
                    onCreateSlot={() => setIsCreateSlotModalOpen(true)}
                    stats={stats}
                />

                <div className="mb-6 flex justify-between">
                    <h2 className="text-2xl font-bold mb-4">Appointments</h2>
                    <BookingFilters
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        counts={counts}
                    />
                    <Button onClick={() => navigate('/doctor/slot')}>Show Slots</Button>
                </div>

                <div className="grid gap-4">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No bookings found for the selected filter.</p>
                        </div>
                    )}
                </div>

                <CreateSlotModal
                    isOpen={isCreateSlotModalOpen}
                    onClose={() => setIsCreateSlotModalOpen(false)}
                    onCreateSlot={handleCreateSlot}
                    doctorId="doc1"
                />
            </div>
        </div>
    );
};

export default DoctorHomePage;