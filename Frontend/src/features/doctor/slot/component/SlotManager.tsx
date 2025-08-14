import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  DollarSign,
  Edit3,
  Monitor,
  MapPin,
  User,
  BookOpenCheck
} from 'lucide-react';
import type { SlotEntity, IavailabilityTime, SlotFormValues } from '@/types/appointment/appointment';
import { SlotEditModal } from './EditSlotModal';

interface SlotsManagerProps {
  slots: SlotEntity[];
  onUpdateSlot?: (slotId: string, timingIndex: number, updatedTiming: IavailabilityTime) => void;
}

export const SlotsManager: React.FC<SlotsManagerProps> = ({ slots, onUpdateSlot }) => {
  const [editingSlot, setEditingSlot] = useState<{
    slot: IavailabilityTime;
    slotId: string;
    timingIndex: number;
  } | null>(null);
  const role = localStorage.getItem('role')
  const handleEditSlot = (slot: IavailabilityTime, slotId: string, timingIndex: number) => {
    setEditingSlot({ slot, slotId, timingIndex });
  };

  const handleSaveSlot = (values: SlotFormValues) => {
    if (!editingSlot || !onUpdateSlot) return;

    const updatedTiming: IavailabilityTime = {
      ...editingSlot.slot,
      startTime: new Date(`2000-01-01T${values.startTime}`),
      endTime: new Date(`2000-01-01T${values.endTime}`),
      consultationDuration: Number(values.consultationDuration),
      price: values.price,
      mode: values.mode,
      status: values.status,
    };

    onUpdateSlot(editingSlot.slotId, editingSlot.timingIndex, updatedTiming);
    setEditingSlot(null);
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-white border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300";
      case "unavailable":
        return "bg-gray-50 border-2 border-gray-200 shadow-md opacity-75";
      default:
        return "bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-100 text-emerald-800 border border-emerald-300";
      case "unavailable":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Doctor Slots Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and edit your consultation slots with ease. Keep track of your availability and pricing.
          </p>
        </motion.header>

        {slots.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No slots available
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first consultation slot to get started managing your appointments.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Create First Slot
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {slots.map((slot, slotIndex) => (
              <motion.div
                key={slot._id || slotIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: slotIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                {/* Date Header */}
                <div className="bg-gradient-to-r bg-black px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Calendar className="w-6 h-6" />
                        {formatDate(slot.date)}
                      </h3>
                      <p className="text-blue-100 mt-1">
                        Doctor ID: {slot.doctorId}
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white font-medium">
                        {slot.timings.length} slots
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slots Grid */}
                <div className="p-8">
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {slot.timings.map((timing, timingIndex) => (
                      <motion.div
                        key={timingIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (slotIndex * 0.1) + (timingIndex * 0.05) }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className={`${getStatusColor(timing.status)} rounded-2xl p-6 relative transition-all duration-300`}
                      >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`${getStatusBadge(timing.status)} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}>
                            {timing.status}
                          </span>
                        </div>

                        {/* Booked Indicator */}
                        {timing.isBooked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                          >
                            ✓ BOOKED
                          </motion.div>
                        )}

                        <div className="space-y-4 mt-4">
                          {/* Time */}
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-lg">
                                {formatTime(timing.startTime)} - {formatTime(timing.endTime)}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {timing.consultationDuration} minutes
                              </div>
                            </div>
                          </div>

                          {/* Price and Mode */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 rounded-xl p-3 text-center">
                              <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                              <div className="font-bold text-green-800 text-lg">${timing.price}</div>
                              <div className="text-green-600 text-xs">Price</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-3 text-center">
                              {timing.mode === 'online' ? (
                                <Monitor className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                              ) : (
                                <MapPin className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                              )}
                              <div className="font-bold text-purple-800 text-sm">
                                {timing.mode === 'online' ? 'Online' : 'In-Person'}
                              </div>
                              <div className="text-purple-600 text-xs">Mode</div>
                            </div>
                          </div>

                          {/* Booked By */}
                          {timing.isBooked && timing.bookedBy && (
                            <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                              <User className="w-4 h-4 text-gray-500" />
                              <div>
                                <div className="text-gray-600 text-xs">Booked by</div>
                                <div className="font-medium text-gray-800">{timing.bookedBy}</div>
                              </div>
                            </div>
                          )}

                          {/* Edit Button */}
                          <motion.button
                            whileHover={{ scale: timing.isBooked ? 1 : 1.05 }}
                            whileTap={{ scale: timing.isBooked ? 1 : 0.95 }}
                            onClick={() => handleEditSlot(timing, slot._id || '', timingIndex)}
                            disabled={timing.isBooked}
                            className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${timing.isBooked
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                              }`}
                          >
                            {role === 'doctor' ? <>
                              <Edit3 className="w-4 h-4" />
                              {timing.isBooked ? 'Cannot Edit' : 'Edit Slot'}
                            </> : <>
                              <BookOpenCheck className='w-4 h-4' />
                              Book Now
                            </>
                            }
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <SlotEditModal
        isOpen={!!editingSlot}
        onClose={() => setEditingSlot(null)}
        slot={editingSlot?.slot || null}
        onSave={handleSaveSlot}
      />
    </div>
  );
};