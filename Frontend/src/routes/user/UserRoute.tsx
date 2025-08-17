
import ProtectedRouteClient from "@/components/protectedRoute/ProtectedRouteUser";
import Login from "@/features/user/auth/pages/LoginPage";
import Signup from "@/features/user/auth/pages/SignupPage";
import BookingDetailsPage from "@/features/user/bookingPage/Pages/BookingDetailsPage";
import UserBookingDetails from "@/features/user/bookingPage/Pages/UserBookingDetails";
import { UserHomePage } from "@/features/user/home/pages/UserHome";
import { Route, Routes } from "react-router-dom";

const UserRoute = () => {
    return (
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<ProtectedRouteClient><UserHomePage /></ProtectedRouteClient>} />
            <Route path='/bookingDetails/:slotId/:doctorId/:timingId' element={<ProtectedRouteClient><BookingDetailsPage /></ProtectedRouteClient>} />
            <Route path='/bookings' element={<ProtectedRouteClient><UserBookingDetails /></ProtectedRouteClient>} />
        </Routes>
    )
}

export default UserRoute