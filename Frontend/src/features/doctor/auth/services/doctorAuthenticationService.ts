import axios from '../../../../axios/doctorAxiosInstance'
import type { DoctorSignupFormType } from '../interfaces/DoctorSignupEntity'

export const doctorSignup = async (data: DoctorSignupFormType, enteredOtp: string) => {
    const response = await axios.post('/signup', { data, enteredOtp })
    // console.log('this is the data in the service file', response)
    return response.data
}

export const sendOtpDoctor = async (email: string) => {
    const response = await axios.post('/send-otp', { email })
    return response.data
}

export const doctorLogin = async (email: string, password: string) => {
    const response = await axios.post('/login', { email, password })
    return response.data
}