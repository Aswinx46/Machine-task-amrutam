import type { FilterStatus } from "@/types/appointment/appointment";
import { Button } from "@/components/ui/button";

interface BookingFiltersProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: {
    all: number;
    booked: number;
    completed: number;
    cancelled: number;
  };
}

export const BookingFilters = ({ activeFilter, onFilterChange, counts }: BookingFiltersProps) => {
  const filters: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all", label: "All Bookings", count: counts.all },
    { key: "booked", label: "Booked", count: counts.booked },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "cancelled", label: "Cancelled", count: counts.cancelled },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          onClick={() => onFilterChange(filter.key)}
          className="relative"
        >
          {filter.label}
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
            activeFilter === filter.key 
              ? "bg-white text-primary" 
              : "bg-secondary text-secondary-foreground"
          }`}>
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
};