
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom"
interface ProtectedRouteProps {
    children: ReactNode;
}
function ProtectedRouteClient({ children }: ProtectedRouteProps) {
    const id = localStorage.getItem('userId')
    return (
        id ? children : <Navigate to='/login' />
    )
}

export default ProtectedRouteClient