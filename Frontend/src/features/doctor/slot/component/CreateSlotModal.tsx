// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import type { SlotEntity, IavailabilityTime } from "@/types/appointment/appointment"
// import { CalendarIcon, Plus, Trash2, AlertCircle } from "lucide-react"
// import { format } from "date-fns"
// import { Card } from "@/components/ui/card"

// const defaultTime: IavailabilityTime = {
//   startTime: "09:00",
//   endTime: "09:30",
//   isBooked: false,
//   consultationDuration: 30,
//   price: "100",
//   mode: "online",
//   status: "active",
// }

// interface CreateSlotModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onCreateSlot: (slot: Omit<SlotEntity, "_id">) => void
//   doctorId: string
// }

// // Utility functions for time conversion and validation
// const convertTo12Hour = (time24: string): string => {
//   const [hours, minutes] = time24.split(":").map(Number)
//   const period = hours >= 12 ? "PM" : "AM"
//   const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
//   return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
// }



// const isEndTimeAfterStartTime = (startTime: string, endTime: string): boolean => {
//   const [startHours, startMinutes] = startTime.split(":").map(Number)
//   const [endHours, endMinutes] = endTime.split(":").map(Number)

//   const startTotalMinutes = startHours * 60 + startMinutes
//   const endTotalMinutes = endHours * 60 + endMinutes

//   return endTotalMinutes > startTotalMinutes
// }

// export const CreateSlotModal = ({ isOpen, onClose, onCreateSlot, doctorId }: CreateSlotModalProps) => {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
//   const [timings, setTimings] = useState<IavailabilityTime[]>([defaultTime])
//   const [timeErrors, setTimeErrors] = useState<{ [key: number]: string }>({})

//   const validateTimeSlot = (index: number, startTime: string, endTime: string) => {
//     const errors = { ...timeErrors }

//     if (!isEndTimeAfterStartTime(startTime, endTime)) {
//       errors[index] = "End time must be after start time"
//     } else {
//       delete errors[index]
//     }

//     setTimeErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   const addTimeSlot = () => {
//     const lastTiming = timings[timings.length - 1]
//     const newSlot: IavailabilityTime = {
//       startTime: lastTiming.endTime,
//       endTime: incrementTime(lastTiming.endTime, 30),
//       isBooked: false,
//       consultationDuration: 30,
//       price: lastTiming.price,
//       mode: lastTiming.mode,
//       status: "active",
//     }
//     setTimings([...timings, newSlot])
//   }

//   const removeTimeSlot = (index: number) => {
//     if (timings.length > 1) {
//       setTimings(timings.filter((_, i) => i !== index))
//       // Remove error for this index
//       const errors = { ...timeErrors }
//       delete errors[index]
//       setTimeErrors(errors)
//     }
//   }

//   const updateTiming = (index: number, field: keyof IavailabilityTime, value: string | number) => {
//     const updatedTimings = [...timings]
//     updatedTimings[index] = { ...updatedTimings[index], [field]: value }
//     setTimings(updatedTimings)

//     // Validate time when start or end time changes
//     if (field === "startTime" || field === "endTime") {
//       const timing = updatedTimings[index]
//       validateTimeSlot(index, timing.startTime, timing.endTime)
//     }
//   }

//   const incrementTime = (time: string, minutes: number): string => {
//     const [hours, mins] = time.split(":").map(Number)
//     const totalMinutes = hours * 60 + mins + minutes
//     const newHours = Math.floor(totalMinutes / 60)
//     const newMins = totalMinutes % 60
//     return `${newHours.toString().padStart(2, "0")}:${newMins.toString().padStart(2, "0")}`
//   }

//   const handleSubmit = () => {
//     if (!selectedDate) return

//     // Validate all time slots before submitting
//     let hasErrors = false
//     const errors: { [key: number]: string } = {}

//     timings.forEach((timing, index) => {
//       if (!isEndTimeAfterStartTime(timing.startTime, timing.endTime)) {
//         errors[index] = "End time must be after start time"
//         hasErrors = true
//       }
//     })

//     setTimeErrors(errors)

//     if (hasErrors) {
//       return
//     }

//     // Convert times to 12-hour format for display/storage if needed
//     const timingsWithFormattedTime = timings.map((timing) => ({
//       ...timing,
//       startTime: convertTo12Hour(timing.startTime),
//       endTime: convertTo12Hour(timing.endTime),
//     }))

//     const slot: Omit<SlotEntity, "_id"> = {
//       doctorId,
//       date: selectedDate,
//       timings: timingsWithFormattedTime,
//     }
//     onCreateSlot(slot)
//     onClose()

//     // Reset form
//     setSelectedDate(new Date())
//     setTimings([
//       {
//         startTime: "09:00",
//         endTime: "09:30",
//         isBooked: false,
//         consultationDuration: 30,
//         price: "100",
//         mode: "online",
//         status: "active",
//       },
//     ])
//     setTimeErrors({})
//   }

//   const hasValidationErrors = Object.keys(timeErrors).length > 0

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-foreground">Create New Appointment Slots</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           <div>
//             <Label htmlFor="date" className="text-base font-semibold">
//               Select Date
//             </Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline" className="w-full justify-start text-left font-normal mt-2 bg-transparent">
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={selectedDate}
//                   onSelect={setSelectedDate}
//                   disabled={(date) => date < new Date()}
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <Label className="text-base font-semibold">Time Slots</Label>
//               <Button onClick={addTimeSlot} size="sm">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Slot
//               </Button>
//             </div>

//             <div className="space-y-4">
//               {timings.map((timing, index) => (
//                 <Card key={index} className={`p-4 ${timeErrors[index] ? "border-destructive" : ""}`}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor={`start-${index}`} className="text-sm">
//                         Start Time
//                       </Label>
//                       <Input
//                         id={`start-${index}`}
//                         type="time"
//                         value={timing.startTime}
//                         onChange={(e) => updateTiming(index, "startTime", e.target.value)}
//                         className={`mt-1 ${timeErrors[index] ? "border-destructive" : ""}`}
//                       />
//                       <div className="text-xs text-muted-foreground mt-1">{convertTo12Hour(timing.startTime)}</div>
//                     </div>

//                     <div>
//                       <Label htmlFor={`end-${index}`} className="text-sm">
//                         End Time
//                       </Label>
//                       <Input
//                         id={`end-${index}`}
//                         type="time"
//                         value={timing.endTime}
//                         onChange={(e) => updateTiming(index, "endTime", e.target.value)}
//                         className={`mt-1 ${timeErrors[index] ? "border-destructive" : ""}`}
//                       />
//                       <div className="text-xs text-muted-foreground mt-1">{convertTo12Hour(timing.endTime)}</div>
//                     </div>

//                     <div>
//                       <Label htmlFor={`price-${index}`} className="text-sm">
//                         Price ($)
//                       </Label>
//                       <Input
//                         id={`price-${index}`}
//                         type="number"
//                         value={timing.price}
//                         onChange={(e) => updateTiming(index, "price", e.target.value)}
//                         className="mt-1"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor={`duration-${index}`} className="text-sm">
//                         Duration (min)
//                       </Label>
//                       <Select
//                         value={timing.consultationDuration.toString()}
//                         onValueChange={(value) => updateTiming(index, "consultationDuration", Number.parseInt(value))}
//                       >
//                         <SelectTrigger className="mt-1">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="15">15 minutes</SelectItem>
//                           <SelectItem value="30">30 minutes</SelectItem>
//                           <SelectItem value="45">45 minutes</SelectItem>
//                           <SelectItem value="60">1 hour</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor={`mode-${index}`} className="text-sm">
//                         Consultation Mode
//                       </Label>
//                       <Select
//                         value={timing.mode}
//                         onValueChange={(value: "online" | "in-person") => updateTiming(index, "mode", value)}
//                       >
//                         <SelectTrigger className="mt-1">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="online">Online</SelectItem>
//                           <SelectItem value="in-person">In-Person</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="flex items-end">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => removeTimeSlot(index)}
//                         disabled={timings.length === 1}
//                         className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
//                       >
//                         <Trash2 className="w-4 h-4 mr-2" />
//                         Remove
//                       </Button>
//                     </div>
//                   </div>

//                   {timeErrors[index] && (
//                     <Alert variant="destructive" className="mt-3">
//                       <AlertCircle className="h-4 w-4" />
//                       <AlertDescription>{timeErrors[index]}</AlertDescription>
//                     </Alert>
//                   )}
//                 </Card>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3 pt-6 border-t">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} disabled={!selectedDate || hasValidationErrors}>
//               Create Slots
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { SlotEntity, IavailabilityTime } from "@/types/appointment/appointment";
import { CalendarIcon, Plus, Trash2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

const defaultTime = (baseDate: Date): IavailabilityTime => ({
  startTime: new Date(baseDate.setHours(9, 0, 0, 0)),
  endTime: new Date(baseDate.setHours(9, 30, 0, 0)),
  isBooked: false,
  consultationDuration: 30,
  price: "100",
  mode: "online",
  status: "active",
});

interface CreateSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSlot: (slot: Omit<SlotEntity, "_id">) => void;
  doctorId: string;
}

// Utility functions
const formatTo12Hour = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const incrementTime = (time: Date, minutes: number) => {
  return new Date(time.getTime() + minutes * 60 * 1000);
};

const isEndTimeAfterStartTime = (start: Date, end: Date) => end.getTime() > start.getTime();

export const CreateSlotModal = ({ isOpen, onClose, onCreateSlot, doctorId }: CreateSlotModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timings, setTimings] = useState<IavailabilityTime[]>([defaultTime(new Date())]);
  const [timeErrors, setTimeErrors] = useState<{ [key: number]: string }>({});

  const validateTimeSlot = (index: number, start: Date, end: Date) => {
    const errors = { ...timeErrors };
    if (!isEndTimeAfterStartTime(start, end)) {
      errors[index] = "End time must be after start time";
    } else {
      delete errors[index];
    }
    setTimeErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addTimeSlot = () => {
    const lastTiming = timings[timings.length - 1];
    const newSlot: IavailabilityTime = {
      startTime: lastTiming.endTime,
      endTime: incrementTime(lastTiming.endTime, 30),
      isBooked: false,
      consultationDuration: 30,
      price: lastTiming.price,
      mode: lastTiming.mode,
      status: "active",
    };
    setTimings([...timings, newSlot]);
  };

  const removeTimeSlot = (index: number) => {
    if (timings.length > 1) {
      const updatedTimings = timings.filter((_, i) => i !== index);
      setTimings(updatedTimings);

      const errors = { ...timeErrors };
      delete errors[index];
      setTimeErrors(errors);
    }
  };

  const handleTimeChange = (index: number, field: "startTime" | "endTime", value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    const date = new Date(selectedDate || new Date());
    const updatedTime = new Date(date.setHours(hours, minutes, 0, 0));

    const updatedTimings = [...timings];
    updatedTimings[index][field] = updatedTime;
    setTimings(updatedTimings);

    validateTimeSlot(index, updatedTimings[index].startTime, updatedTimings[index].endTime);
  };

  const handleSubmit = () => {
    if (!selectedDate) return;

    // Validate all slots
    const errors: { [key: number]: string } = {};
    let hasErrors = false;

    timings.forEach((t, i) => {
      if (!isEndTimeAfterStartTime(t.startTime, t.endTime)) {
        errors[i] = "End time must be after start time";
        hasErrors = true;
      }
    });

    setTimeErrors(errors);
    if (hasErrors) return;

    const slot: Omit<SlotEntity, "_id"> = {
      doctorId,
      date: selectedDate,
      timings,
    };

    onCreateSlot(slot);
    onClose();

    setSelectedDate(new Date());
    setTimings([defaultTime(new Date())]);
    setTimeErrors({});
  };

  const hasValidationErrors = Object.keys(timeErrors).length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Create New Appointment Slots</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="date" className="text-base font-semibold">
              Select Date
            </Label>
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
                <Card key={index} className={`p-4 ${timeErrors[index] ? "border-destructive" : ""}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`start-${index}`} className="text-sm">
                        Start Time
                      </Label>
                      <Input
                        id={`start-${index}`}
                        type="time"
                        value={timing.startTime.toTimeString().slice(0, 5)}
                        onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
                        className={`mt-1 ${timeErrors[index] ? "border-destructive" : ""}`}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{formatTo12Hour(timing.startTime)}</div>
                    </div>

                    <div>
                      <Label htmlFor={`end-${index}`} className="text-sm">
                        End Time
                      </Label>
                      <Input
                        id={`end-${index}`}
                        type="time"
                        value={timing.endTime.toTimeString().slice(0, 5)}
                        onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
                        className={`mt-1 ${timeErrors[index] ? "border-destructive" : ""}`}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{formatTo12Hour(timing.endTime)}</div>
                    </div>

                    <div>
                      <Label htmlFor={`price-${index}`} className="text-sm">
                        Price ($)
                      </Label>
                      <Input
                        id={`price-${index}`}
                        type="number"
                        value={timing.price}
                        onChange={(e) => {
                          const updated = [...timings];
                          updated[index].price = e.target.value;
                          setTimings(updated);
                        }}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`duration-${index}`} className="text-sm">
                        Duration (min)
                      </Label>
                      <Select
                        value={timing.consultationDuration.toString()}
                        onValueChange={(value) => {
                          const updated = [...timings];
                          updated[index].consultationDuration = Number.parseInt(value);
                          setTimings(updated);
                        }}
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
                      <Label htmlFor={`mode-${index}`} className="text-sm">
                        Consultation Mode
                      </Label>
                      <Select
                        value={timing.mode}
                        onValueChange={(value: "online" | "in-person") => {
                          const updated = [...timings];
                          updated[index].mode = value;
                          setTimings(updated);
                        }}
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

                  {timeErrors[index] && (
                    <Alert variant="destructive" className="mt-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{timeErrors[index]}</AlertDescription>
                    </Alert>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedDate || hasValidationErrors}>
              Create Slots
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
