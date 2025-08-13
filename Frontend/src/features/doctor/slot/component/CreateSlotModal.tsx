import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type{ SlotEntity, IavailabilityTime } from "@/types/appointment/appointment";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

interface CreateSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSlot: (slot: Omit<SlotEntity, "_id">) => void;
  doctorId: string;
}

export const CreateSlotModal = ({ isOpen, onClose, onCreateSlot, doctorId }: CreateSlotModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timings, setTimings] = useState<IavailabilityTime[]>([
    {
      startTime: "09:00",
      endTime: "09:30",
      isBooked: false,
      consultationDuration: 30,
      price: "100",
      mode: "online",
      status: "active"
    }
  ]);

  const addTimeSlot = () => {
    const lastTiming = timings[timings.length - 1];
    const newSlot: IavailabilityTime = {
      startTime: lastTiming.endTime,
      endTime: incrementTime(lastTiming.endTime, 30),
      isBooked: false,
      consultationDuration: 30,
      price: lastTiming.price,
      mode: lastTiming.mode,
      status: "active"
    };
    setTimings([...timings, newSlot]);
  };

  const removeTimeSlot = (index: number) => {
    if (timings.length > 1) {
      setTimings(timings.filter((_, i) => i !== index));
    }
  };

  const updateTiming = (index: number, field: keyof IavailabilityTime, value: any) => {
    const updatedTimings = [...timings];
    updatedTimings[index] = { ...updatedTimings[index], [field]: value };
    setTimings(updatedTimings);
  };

  const incrementTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMins.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (!selectedDate) return;
    
    const slot: Omit<SlotEntity, "_id"> = {
      doctorId,
      date: selectedDate,
      timings
    };
    
    onCreateSlot(slot);
    onClose();
    
    // Reset form
    setSelectedDate(new Date());
    setTimings([{
      startTime: "09:00",
      endTime: "09:30",
      isBooked: false,
      consultationDuration: 30,
      price: "100",
      mode: "online",
      status: "active"
    }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Appointment Slots
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="date" className="text-base font-semibold">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-base font-semibold">Time Slots</Label>
              <Button onClick={addTimeSlot} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Slot
              </Button>
            </div>

            <div className="space-y-4">
              {timings.map((timing, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`start-${index}`} className="text-sm">Start Time</Label>
                      <Input
                        id={`start-${index}`}
                        type="time"
                        value={timing.startTime}
                        onChange={(e) => updateTiming(index, "startTime", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`end-${index}`} className="text-sm">End Time</Label>
                      <Input
                        id={`end-${index}`}
                        type="time"
                        value={timing.endTime}
                        onChange={(e) => updateTiming(index, "endTime", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`price-${index}`} className="text-sm">Price ($)</Label>
                      <Input
                        id={`price-${index}`}
                        type="number"
                        value={timing.price}
                        onChange={(e) => updateTiming(index, "price", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`duration-${index}`} className="text-sm">Duration (min)</Label>
                      <Select
                        value={timing.consultationDuration.toString()}
                        onValueChange={(value) => updateTiming(index, "consultationDuration", parseInt(value))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`mode-${index}`} className="text-sm">Consultation Mode</Label>
                      <Select
                        value={timing.mode}
                        onValueChange={(value: "online" | "in-person") => updateTiming(index, "mode", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeTimeSlot(index)}
                        disabled={timings.length === 1}
                        className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedDate}>
              Create Slots
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};