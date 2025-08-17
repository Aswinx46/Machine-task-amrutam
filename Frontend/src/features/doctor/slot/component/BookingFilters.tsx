import type { BookingStatus } from "@/types/appointment/appointment";
import { Button } from "@/components/ui/button";

interface BookingFiltersProps {
  activeFilter: BookingStatus;
  onFilterChange: (filter: BookingStatus) => void;

}

export const BookingFilters = ({ activeFilter, onFilterChange }: BookingFiltersProps) => {
  const filters: { key: BookingStatus; label: string;  }[] = [
    { key: "", label: "All Bookings"},
    { key: "booked", label: "Booked" },
    { key: "completed", label: "Completed", },
    { key: "cancelled", label: "Cancelled", },
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
   
        </Button>
      ))}
    </div>
  );
};