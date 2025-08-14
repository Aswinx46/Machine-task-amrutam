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
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import type{ SlotEntity, IavailabilityTime, SlotFormValues } from '@/types/appointment/appointment';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'expired':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'slot-card-active';
      case 'inactive':
        return 'slot-card-inactive';
      case 'expired':
        return 'slot-card-inactive';
      default:
        return 'slot-card';
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
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            Doctor Slots Management
          </h1>
          <p className="text-muted-foreground">
            Manage and edit your consultation slots
          </p>
        </motion.header>

        {slots.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No slots available
            </h3>
            <p className="text-muted-foreground">
              Create your first consultation slot to get started.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {slots.map((slot, slotIndex) => (
              <motion.div
                key={slot._id || slotIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: slotIndex * 0.1 }}
                className="slot-card"
              >
                <div className="mb-4 pb-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {formatDate(slot.date)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Doctor ID: {slot.doctorId}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {slot.timings.map((timing, timingIndex) => (
                    <motion.div
                      key={timingIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (slotIndex * 0.1) + (timingIndex * 0.05) }}
                      whileHover={{ scale: 1.02 }}
                      className={`${getStatusColor(timing.status)} ${
                        timing.isBooked ? 'slot-card-booked' : ''
                      } relative overflow-hidden`}
                    >
                      {timing.isBooked && (
                        <div className="absolute top-2 right-2">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium"
                          >
                            Booked
                          </motion.div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-medium text-card-foreground">
                              {formatTime(timing.startTime)} - {formatTime(timing.endTime)}
                            </span>
                          </div>
                          {getStatusIcon(timing.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-success" />
                            <span className="text-card-foreground">${timing.price}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-card-foreground">{timing.consultationDuration}min</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          {timing.mode === 'online' ? (
                            <Monitor className="w-4 h-4 text-primary" />
                          ) : (
                            <MapPin className="w-4 h-4 text-primary" />
                          )}
                          <span className="text-card-foreground capitalize">
                            {timing.mode === 'online' ? '🌐 Online' : '🏥 In-Person'}
                          </span>
                        </div>

                        {timing.isBooked && timing.bookedBy && (
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Booked by: {timing.bookedBy}
                            </span>
                          </div>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditSlot(timing, slot._id || '', timingIndex)}
                          className="medical-button-primary w-full flex items-center justify-center gap-2"
                          disabled={timing.isBooked}
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Slot
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
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