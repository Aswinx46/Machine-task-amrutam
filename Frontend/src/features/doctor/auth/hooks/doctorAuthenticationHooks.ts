import { useMutation } from "@tanstack/react-query";
import { doctorSignup, sendOtpDoctor } from "../services/doctorAuthenticationService";
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