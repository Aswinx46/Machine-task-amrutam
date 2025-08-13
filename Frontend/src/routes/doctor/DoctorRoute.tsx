import DoctorLogin from "@/features/doctor/auth/pages/DoctorLogin"
import DoctorSignup from "@/features/doctor/auth/pages/DoctorSignup"
import { Route, Routes } from "react-router-dom"

const DoctorRoute = () => {
    return (
        <Routes>
            <Route path="/signUp" element={<DoctorSignup />} />
            <Route path="/login" element={<DoctorLogin />} />
        </Routes>
    )
}

export default DoctorRoute