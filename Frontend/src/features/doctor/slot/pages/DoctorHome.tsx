import { useEffect, useState } from "react";

import type { BookingStatus, PopulatedBookingForDoctor, SlotEntity } from "@/types/appointment/appointment";
import { DoctorHeader } from "../component/DoctorHeader";
import { BookingFilters } from "../component/BookingFilters";
import { BookingCard } from "../component/BookingCard";
import { CreateSlotModal } from "../component/CreateSlotModal";
import { toast } from "sonner";
import { useCreateSlot, useDoctorLogout, useFindBookingOfDoctor } from "../hooks/slotHook";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/reduxstrore/store";
import { checkDateConflict } from "../utils/checkDateConflict";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/Pagination";
import { removeDoctor } from "@/reduxstrore/slices/doctorSlice";
import { removeToken } from "@/reduxstrore/slices/tokenSlice";



const DoctorHomePage = () => {
    const [bookings, setBookings] = useState<PopulatedBookingForDoctor[]>([]);
    const [activeFilter, setActiveFilter] = useState<BookingStatus>("");
    const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);
    const createSlotMutation = useCreateSlot()
    const [page, setPage] = useState<number>(1)
    const findBookings = useFindBookingOfDoctor(page, activeFilter)
    const logoutMutation = useDoctorLogout()
    useEffect(() => {
        setBookings(findBookings.data?.bookings)
    }, [findBookings.data])
    const doctor = useSelector((state: RootState) => state.doctor.doctor)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    if (!doctor) return

    const stats = {
        todayBookings: bookings?.length,
        totalSlots: 12, // Mock data
        completedToday: bookings?.length,
    };



    const handleCreateSlot = (slot: Omit<SlotEntity, "_id">) => {
        slot.doctorId = doctor?._id
        if (checkDateConflict(slot)) {
            toast("Date Conflict Found")
            return
        }
        createSlotMutation.mutate(slot, {
            onSuccess: () => {
                toast('Slot Created')
            },
            onError: (err) => {
                console.log('error while creating the slot', err)
                toast(err.message)
            }
        })

    };

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                localStorage.removeItem('doctorId')
                localStorage.removeItem('role')
                dispatch(removeDoctor(null))
                dispatch(removeToken(null))
                toast('Logout Successfull')
                navigate('/doctor/login', { replace: true })
            },
            onError: (err) => {
                toast(err.message)
            }
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <DoctorHeader
                    doctorName={doctor.name}
                    onCreateSlot={() => setIsCreateSlotModalOpen(true)}
                    stats={stats}
                    handleLogout={handleLogout}
                />

                <div className="mb-6 flex justify-between">
                    <h2 className="text-2xl font-bold mb-4">Appointments</h2>
                    <BookingFilters
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />
                    <Button onClick={() => navigate('/doctor/slot')}>Show Slots</Button>
                </div>

                <div className="grid gap-4">
                    {bookings?.length > 0 ? (
                        bookings?.map((booking) => (
                            <BookingCard
                                key={booking._id}
                                doctorbooking={booking}
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
            {findBookings.data?.totalPages && <Pagination current={page} setPage={setPage} total={findBookings.data?.totalPages} />}
        </div>
    );
};

export default DoctorHomePage;