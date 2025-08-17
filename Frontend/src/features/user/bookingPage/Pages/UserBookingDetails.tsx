/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useCancellOrRescheduleBooking, useFindBookingsOfUser } from "../hooks/bookingHooks"
import { BookingCard } from "@/features/doctor/slot/component/BookingCard"
import type { BookingStatus, PopulatedBookingForUser } from "@/types/appointment/appointment"
import Pagination from "@/components/Pagination"
import { BookingFilters } from "@/features/doctor/slot/component/BookingFilters"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"


function UserBookingDetails() {
    const [page, setPage] = useState<number>(1)
    const [activeFilter, setActiveFilter] = useState<BookingStatus>("");
    const bookingData = useFindBookingsOfUser(page, activeFilter)
    const cancelOrRescheduleBooking = useCancellOrRescheduleBooking()
    const queryClient = useQueryClient();

    const handleCancelBooking = (bookingId: string, doctorId: string) => {
        // const now = Date.now()
        // const startTime = new Date(date).getTime()
        // const diffInHours = (startTime - now) / (1000 * 60 * 60)
        // if (diffInHours < 24) {
        //     toast("You cannot cancel or reschedule within 24 hours of the appointment.");
        //     return
        // }
        cancelOrRescheduleBooking.mutate(
            { bookingId, doctorId, page, status: 'cancelled' },
            {
                onSuccess: (data) => {
                    toast('Booking Cancelled');
                    console.log('this is the data from the backend', data);

                    queryClient.setQueryData<any>(
                        ['bookingsOfUser', page, activeFilter],
                        (oldData: any) => {
                            if (!oldData) return oldData;

                            return {
                                ...oldData,
                                bookings: oldData.bookings.map((booking: any) =>
                                    booking._id === data.updateBookingData._id
                                        ? { ...booking, ...data.updateBookingData } // update the cancelled booking
                                        : booking
                                ),
                            };
                        }
                    );
                },
                onError: (err) => {
                    toast(err.message);
                    console.log('error while cancelling the booking', err);
                },
            }
        );
    }
    const handleRescheduleBooking = (bookingId: string, doctorId: string) => {
        cancelOrRescheduleBooking.mutate({ bookingId, doctorId, page: 1, status: 'reschedule' })
    }
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-foreground mb-2">
                            My Appointments
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Manage and view your upcoming medical appointments
                        </p>
                    </div>
                    <div className="mb-6 flex justify-between">
                        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
                        <BookingFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}

                        />
                    </div>
                    {bookingData.data?.bookings &&
                        bookingData.data?.bookings.map((booking: PopulatedBookingForUser) => {
                            return <BookingCard key={booking._id} userBookings={booking} cancelBooking={handleCancelBooking} rescheduleBooking={handleRescheduleBooking} />
                        })
                    }

                </div>
                {bookingData.data?.totalPages && <Pagination current={page} setPage={setPage} total={bookingData.data.totalPages} />}
            </div>
        </div>
    )
}

export default UserBookingDetails
