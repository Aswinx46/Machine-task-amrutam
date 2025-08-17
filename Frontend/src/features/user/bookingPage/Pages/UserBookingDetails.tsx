import { useState } from "react"
import { useFindBookingsOfUser } from "../hooks/bookingHooks"
import { BookingCard } from "@/features/doctor/slot/component/BookingCard"
import type { BookingStatus, PopulatedBookingForUser } from "@/types/appointment/appointment"
import Pagination from "@/components/Pagination"
import { BookingFilters } from "@/features/doctor/slot/component/BookingFilters"


function UserBookingDetails() {
    const [page, setPage] = useState<number>(1)
    const [activeFilter, setActiveFilter] = useState<BookingStatus>("");
    const bookingData = useFindBookingsOfUser(page, activeFilter)
    const handleCancelBooking = (bookingId: string) => {

    }
    const handleRescheduleBooking = (bookingId: string) => {

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
                            return <BookingCard userBookings={booking} cancelBooking={handleCancelBooking} rescheduleBooking={handleRescheduleBooking} />
                        })
                    }

                </div>
                {bookingData.data?.totalPages && <Pagination current={page} setPage={setPage} total={bookingData.data.totalPages} />}
            </div>
        </div>
    )
}

export default UserBookingDetails
