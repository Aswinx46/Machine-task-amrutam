import { useMutation } from "@tanstack/react-query";
import { doctorLogin, doctorSignup, sendOtpDoctor } from "../services/doctorAuthenticationService";
import type { DoctorSignupFormType } from "../interfaces/DoctorSignupEntity";

export const useSendOtpDoctor = () => {
    return useMutation({
        mutationFn: (email: string) => sendOtpDoctor(email)
    })
}

export const useSignupDoctor = () => {
    return useMutation({
        mutationFn: ({ data, enteredOtp }: { data: DoctorSignupFormType, enteredOtp: string }) => doctorSignup(data, enteredOtp)
    })
}

export const useDoctorLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => doctorLogin(email, password)
    })
}