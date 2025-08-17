import ProtectedRouteDoctor from "@/components/protectedRoute/ProtectedRouteDoctor"
import DoctorLogin from "@/features/doctor/auth/pages/DoctorLogin"
import DoctorSignup from "@/features/doctor/auth/pages/DoctorSignup"
import DoctorHome from "@/features/doctor/slot/pages/DoctorHome"
import SlotPage from "@/features/doctor/slot/pages/SlotListing"
import { Route, Routes } from "react-router-dom"

const DoctorRoute = () => {
    return (
        <Routes>
            <Route path="/signUp" element={<DoctorSignup />} />
            <Route path="/login" element={<DoctorLogin />} />
            <Route path="/home" element={<ProtectedRouteDoctor><DoctorHome /></ProtectedRouteDoctor>} />
            <Route path="/slot" element={<ProtectedRouteDoctor><SlotPage /></ProtectedRouteDoctor>} />
        </Routes>
    )
}

export default DoctorRoute