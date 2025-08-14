import  { useState } from 'react';
import { SlotsManager } from '../component/SlotManager';
import type { SlotEntity, IavailabilityTime } from '@/types/appointment/appointment';

const SlotPage = () => {
    // Sample data for demonstration
    const [slots, setSlots] = useState<SlotEntity[]>([
        {
            _id: '1',
            doctorId: 'DR001',
            date: new Date('2024-08-15'),
            timings: [
                {
                    startTime: new Date('2024-08-15T09:00:00'),
                    endTime: new Date('2024-08-15T09:30:00'),
                    isBooked: false,
                    consultationDuration: 30,
                    price: '150.00',
                    mode: 'online',
                    status: 'active'
                },
                {
                    startTime: new Date('2024-08-15T10:00:00'),
                    endTime: new Date('2024-08-15T10:45:00'),
                    isBooked: true,
                    bookedBy: 'patient@example.com',
                    consultationDuration: 45,
                    price: '200.00',
                    mode: 'in-person',
                    status: 'active'
                },
                {
                    startTime: new Date('2024-08-15T14:00:00'),
                    endTime: new Date('2024-08-15T14:30:00'),
                    isBooked: false,
                    consultationDuration: 30,
                    price: '150.00',
                    mode: 'online',
                    status: 'inactive'
                }
            ]
        },
        {
            _id: '2',
            doctorId: 'DR001',
            date: new Date('2024-08-16'),
            timings: [
                {
                    startTime: new Date('2024-08-16T09:00:00'),
                    endTime: new Date('2024-08-16T09:30:00'),
                    isBooked: false,
                    consultationDuration: 30,
                    price: '150.00',
                    mode: 'online',
                    status: 'active'
                },
                {
                    startTime: new Date('2024-08-16T11:00:00'),
                    endTime: new Date('2024-08-16T12:00:00'),
                    isBooked: false,
                    consultationDuration: 60,
                    price: '250.00',
                    mode: 'in-person',
                    status: 'expired'
                }
            ]
        }
    ]);

    const handleUpdateSlot = (slotId: string, timingIndex: number, updatedTiming: IavailabilityTime) => {
        setSlots(prevSlots =>
            prevSlots.map(slot =>
                slot._id === slotId
                    ? {
                        ...slot,
                        timings: slot.timings.map((timing, index) =>
                            index === timingIndex ? updatedTiming : timing
                        )
                    }
                    : slot
            )
        );
    };

    return (
        <SlotsManager
            slots={slots}
            onUpdateSlot={handleUpdateSlot}
        />
    );
};

export default SlotPage;