import { useState } from 'react';
import { SlotsManager } from '../component/SlotManager';
import type { SlotEntity, IavailabilityTime } from '@/types/appointment/appointment';
import { useFindSlotsOfDoctor } from '../hooks/slotHook';
import Pagination from '@/components/Pagination';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const SlotPage = () => {
    // Sample data for demonstration
    const [page, setPage] = useState(1)

    const slotsofDoctor = useFindSlotsOfDoctor(page)
    let slots: SlotEntity[] = slotsofDoctor?.data?.slots

    const handleUpdateSlot = (slotId: string, timingIndex: number, updatedTiming: IavailabilityTime) => {
        slots = slots.map(slot =>
            slot._id === slotId
                ? {
                    ...slot,
                    timings: slot.timings.map((timing, index) =>
                        index === timingIndex ? updatedTiming : timing
                    )
                }
                : slot
        )
    };

    return (
        <>
            {slotsofDoctor.isFetching && <LoadingSpinner fullScreen={true} />}
            {slots && <SlotsManager
                slots={slots}
                onUpdateSlot={handleUpdateSlot}
            />}
            {slots && slots.length > 0 && < Pagination current={page} setPage={setPage} total={slotsofDoctor.data.totalPages} />}
        </>
    );
};

export default SlotPage;