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
            <Route path="/home" element={<DoctorHome />} />
            <Route path="/slot" element={<SlotPage />} />
        </Routes>
    )
}

export default DoctorRoute