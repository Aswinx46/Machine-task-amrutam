import type { BookingEntity, IavailabilityTime, SlotWithDoctorDetailsEntity } from "@/types/appointment/appointment";
import SlotBookingComponent from "../components/BookingDetailsCard";
import { useParams } from "react-router-dom";
import { useFindSlotDetails, useSendOtpAndLockSlot, useVerifyOtpAndCreateBooking } from "../hooks/bookingHooks";
import { useEffect, useState } from "react";
import type { DoctorEntity } from "@/types/Doctor/DoctorType";
import OTPModal from "@/components/OtpModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/reduxstrore/store";
import { toast } from "sonner";

const ExampleUsage: React.FC = () => {
    const params = useParams()
    const findSlotDetailsMutate = useFindSlotDetails()
    const sendOtpAndLockSlotMutation = useSendOtpAndLockSlot()
    const verifyOtpAndConfirmBookingMutation = useVerifyOtpAndCreateBooking()
    const [slot, setSlot] = useState<SlotWithDoctorDetailsEntity | null>(null)
    const [timing, setTiming] = useState<IavailabilityTime | null>(null)
    const [doctor, setDoctor] = useState<DoctorEntity | null>(null)
    const [showOtpModal, setShowOtpModal] = useState<boolean>(false)
    const [bookingDetails, setBookingDetails] = useState<BookingEntity | null>(null)
    const user = useSelector((state: RootState) => state.user.user)
    useEffect(() => {
        if (!params.slotId || !params.doctorId || !params.timingId) return
        findSlotDetailsMutate.mutate({ slotId: params.slotId, doctorId: params.doctorId, timingId: params.timingId }, {
            onSuccess: (data) => {
                setSlot(data.slots)
                setTiming(data.slots.timings)
                setDoctor(data.slots.doctorId)
            },
            onError: (err) => {
                console.log('error while finding the details o fthe slot', err)
                toast(err.message)
            }
        })
    }, [])
    if (!user) return

    const handleVerifyOtp = async (otp: string) => {
        if (!bookingDetails) return
        verifyOtpAndConfirmBookingMutation.mutate({ data: bookingDetails, otp, email: user.email }, {
            onSuccess: () => {
                toast("Slot Booked")
                setShowOtpModal(false)
            },
            onError: (err) => {
                toast(err.message)
            }
        })
    }
    const handleResendOtp = async () => {

    }
    const handleBooking = (slotId: string, timingDetails: IavailabilityTime) => {
        if (!slot) return
        console.log('this s the slot', slot)
        const bookingDetails: BookingEntity = {
            date: slot?.date,
            doctorId: slot?.doctorId._id,
            endTime: timingDetails.endTime,
            recurring: false,
            startTime: timingDetails.startTime,
            status: 'booked',
            consultationType: timingDetails.mode,
            slotId,
            timingId: timingDetails._id!,
            userId: user._id!,

        }
        setBookingDetails(bookingDetails)
        sendOtpAndLockSlotMutation.mutate({ email: user.email, slotId, timingId: timingDetails._id! }, {
            onSuccess: () => {
                toast('OTP Sended For Verification')
                setShowOtpModal(true)
            },
            onError: (err) => {
                console.log('error while sending the otp for locking the slot', err)
                setShowOtpModal(false)
                toast(err.message)
            }
        })
    };

    return (
        <div className="min-h-screen bg-gray-100 ">

            {slot && doctor && timing && <SlotBookingComponent
                slot={slot}
                timing={timing}
                doctor={doctor}
                onBook={handleBooking}
            />}
            {showOtpModal && <OTPModal isOpen={showOtpModal} onClose={() => setShowOtpModal(false)} onResendOTP={handleResendOtp} onVerifyOTP={handleVerifyOtp} />}
        </div>
    );
};

export default ExampleUsage;