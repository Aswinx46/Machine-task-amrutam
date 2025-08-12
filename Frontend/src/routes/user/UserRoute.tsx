
import Login from "@/features/user/auth/pages/LoginPage";
import Signup from "@/features/user/auth/pages/SignupPage";
import { Route, Routes } from "react-router-dom";

const UserRoute = () => {
    return (
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default UserRoute