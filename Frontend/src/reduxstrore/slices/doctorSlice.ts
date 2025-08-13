import type { DoctorEntity } from '@/types/Doctor/DoctorType'
import { createSlice } from '@reduxjs/toolkit'

const initialState: { doctor: DoctorEntity | null } = {
    doctor: null
}

const doctorSlice = createSlice({
    name: "doctorSlice",
    initialState,
    reducers: {
        addDoctor: (state, action) => {
            state.doctor = action.payload
        },
        removeDoctor: (state, action) => {
            state.doctor = action.payload
        }
    }
})

export const { addDoctor, removeDoctor } = doctorSlice.actions
export default doctorSlice.reducer