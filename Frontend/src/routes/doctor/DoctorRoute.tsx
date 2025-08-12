import DoctorSignup from "@/features/doctor/auth/pages/DoctorSignup"
import { Route, Routes } from "react-router-dom"

const DoctorRoute = () => {
    return (
        <Routes>
            <Route path="/signUp" element={<DoctorSignup />} />
        </Routes>
    )
}

export default DoctorRoute