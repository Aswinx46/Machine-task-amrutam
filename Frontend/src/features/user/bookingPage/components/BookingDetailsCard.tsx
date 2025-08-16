import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Video, MapPin, DollarSign, CheckCircle, Award, GraduationCap, Mail, MapPinIcon, X } from 'lucide-react';
import type { IavailabilityTime, SlotWithDoctorDetailsEntity } from '@/types/appointment/appointment';
import type { DoctorEntity } from '@/types/Doctor/DoctorType';

interface SlotBookingProps {
  slot: SlotWithDoctorDetailsEntity;
  timing: IavailabilityTime;
  doctor: DoctorEntity;
  onBook: (slotId: string, timingDetails: IavailabilityTime) => void;
  onClose?: () => void;
}

const SlotBookingComponent: React.FC<SlotBookingProps> = ({
  slot,
  timing,
  doctor,
  onBook,
  onClose
}) => {
  const [isBooking, setIsBooking] = useState(false);



  const handleBookSlot = async () => {
    if (timing.isBooked || timing.status !== 'active') return;

    setIsBooking(true);

    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    onBook(slot._id || '', timing);
    setIsBooking(false);
  };

  const getStatusColor = () => {
    if (timing.isBooked) return 'text-red-500 bg-red-50 border-red-200';
    if (timing.status === 'expired') return 'text-gray-500 bg-gray-50 border-gray-200';
    if (timing.status === 'inactive') return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-green-500 bg-green-50 border-green-200';
  };

  const getStatusText = () => {
    if (timing.isBooked) return 'Booked';
    if (timing.status === 'expired') return 'Expired';
    if (timing.status === 'inactive') return 'Inactive';
    return 'Available';
  };

  const isBookable = !timing.isBooked && timing.status === 'active';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-auto md:h-screen  w-full flex justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white  w-full md:w-3/4   overflow-hidden relative"
      >
        {/* Close button */}
        {onClose && (
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 text-gray-600" />
          </motion.button>
        )}

        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Section - Doctor Details */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/5 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-6 lg:p-8 overflow-y-auto"
          >
            {/* Doctor Profile */}
            <div className="text-center mb-8">
              <motion.div
                className="w-24 h-24 lg:w-32 lg:h-32 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              </motion.div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">{doctor.name}</h1>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {doctor.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-black bg-opacity-20 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>

            </div>

            {/* Doctor Information */}
            <div className="space-y-6">
              {doctor.qualification && (
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GraduationCap className="w-6 h-6 text-blue-200 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Qualification</h3>
                    <p className="text-blue-100">{doctor.qualification}</p>
                  </div>
                </motion.div>
              )}

              {doctor.experienceYears && (
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Award className="w-6 h-6 text-blue-200 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Experience</h3>
                    <p className="text-blue-100">{doctor.experienceYears}</p>
                  </div>
                </motion.div>
              )}

              {doctor.clinicName && (
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <MapPinIcon className="w-6 h-6 text-blue-200 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Hospital</h3>
                    <p className="text-blue-100">{doctor.clinicName}</p>
                  </div>
                </motion.div>
              )}

              {doctor.bio && (
                <motion.div
                  className="pt-4 border-t border-white border-opacity-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{doctor.bio}</p>
                </motion.div>
              )}

              {/* Contact Information */}
              <motion.div
                className="pt-4 border-t border-white border-opacity-20 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="font-semibold mb-3">Contact Information</h3>
                {doctor.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-200" />
                    <span className="text-blue-100">{doctor.email}</span>
                  </div>
                )}
                {doctor.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-200 mt-1 flex-shrink-0" />
                    <span className="text-blue-100 text-sm">{doctor.address}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Appointment Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:w-3/5 p-6 lg:p-8 overflow-y-auto"
          >
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  Book Your Appointment
                </h2>
                <p className="text-gray-600">
                  Schedule your consultation with {doctor.name}
                </p>
              </div>

              {/* Appointment Card */}
              <motion.div
                className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <motion.div
                    className="p-4 bg-blue-50 rounded-xl border border-blue-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-gray-700">Date</span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {new Date(slot.date).toDateString()}
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-purple-50 rounded-xl border border-purple-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="font-semibold text-gray-700">Time</span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {new Date(timing.startTime).toLocaleTimeString()} - {new Date(timing.endTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Duration: {timing.consultationDuration} minutes
                    </p>
                  </motion.div>
                </div>

                {/* Mode and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      {timing.mode === 'online' ? (
                        <Video className="w-5 h-5 text-blue-500" />
                      ) : (
                        <MapPin className="w-5 h-5 text-green-500" />
                      )}
                      <span className="font-semibold text-gray-700">Consultation Mode</span>
                    </div>
                    <p className="text-gray-800 font-medium capitalize">
                      {timing.mode} Consultation
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-gray-500" />
                      <span className="font-semibold text-gray-700">Status</span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <motion.div
                  className="p-4 bg-green-50 rounded-xl border border-green-200 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-gray-700">Consultation Fee</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{timing.price}
                    </span>
                  </div>
                </motion.div>

                {/* Additional Information */}
                {(timing.bookedBy || slot._id) && (
                  <motion.div
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-semibold text-gray-700 mb-2">Additional Details</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      {slot._id && <p><strong>Slot ID:</strong> {slot._id}</p>}
                      <p><strong>Doctor ID:</strong> {doctor._id}</p>
                      {timing.bookedBy && <p><strong>Booked By:</strong> {timing.bookedBy}</p>}
                    </div>
                  </motion.div>
                )}

                {/* Book Button */}
                <motion.button
                  onClick={handleBookSlot}
                  disabled={!isBookable || isBooking}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${isBookable
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  whileHover={isBookable ? { scale: 1.02 } : {}}
                  whileTap={isBookable ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <AnimatePresence mode="wait">
                    {isBooking ? (
                      <motion.div
                        key="booking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Booking Appointment...</span>
                      </motion.div>
                    ) : !isBookable ? (
                      <motion.div
                        key="unavailable"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>
                          {timing.isBooked ? 'Already Booked' : 'Unavailable'}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="available"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-lg"
                      >
                        Confirm Booking
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Important Notes */}
              <motion.div
                className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-semibold text-blue-800 mb-2">Important Notes</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Please join the consultation 5 minutes before the scheduled time</li>
                  <li>• Carry all relevant medical documents and reports</li>
                  <li>• Cancellation must be done at least 24 hours before the appointment</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SlotBookingComponent