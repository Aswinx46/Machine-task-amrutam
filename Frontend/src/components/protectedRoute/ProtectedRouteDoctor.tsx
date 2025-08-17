
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom"
interface ProtectedRouteProps {
    children: ReactNode;
}
function ProtectedRouteDoctor({ children }: ProtectedRouteProps) {
    const id = localStorage.getItem('doctorId')
    return (
        id ? children : <Navigate to='/doctor/login' />
    )
}

export default ProtectedRouteDoctor