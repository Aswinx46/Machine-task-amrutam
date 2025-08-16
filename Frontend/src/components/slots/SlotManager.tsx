import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
} from 'lucide-react';
import type {  IavailabilityTime, SlotFormValues, SlotWithDoctorDetailsEntity } from '@/types/appointment/appointment';
import { SlotEditModal } from '../../features/doctor/slot/component/EditSlotModal';
import SlotCard from './SlotCard';

interface SlotsManagerProps {
  slots: SlotWithDoctorDetailsEntity[];
  onUpdateSlot?: (slotId: string, timingIndex: number, updatedTiming: IavailabilityTime) => void;
}

export const SlotsManager: React.FC<SlotsManagerProps> = ({ slots, onUpdateSlot }) => {
  const [editingSlot, setEditingSlot] = useState<{
    slot: IavailabilityTime;
    slotId: string;
    timingIndex: number;
  } | null>(null);
  const role = localStorage.getItem('role')
  if (!role) return
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
          <>
            {slots && < SlotCard isDoctor={true} role={role} slots={slots} handleEditSlot={handleEditSlot} />}
          </>
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