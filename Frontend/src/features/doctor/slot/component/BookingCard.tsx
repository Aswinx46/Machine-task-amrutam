
import type {
  PopulatedBookingForDoctor,
  BookingStatus,
  PopulatedBookingForUser
} from "@/types/appointment/appointment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Phone, Mail, Video, MapPin, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
  doctorbooking?: PopulatedBookingForDoctor;
  userBookings?: PopulatedBookingForUser;
  cancelBooking?: (bookingId: string) => void
  rescheduleBooking?: (bookingId: string) => void
}

export const BookingCard = ({ doctorbooking, userBookings, cancelBooking, rescheduleBooking }: BookingCardProps) => {
  if (!doctorbooking && !userBookings) {
    return <h1>No Bookings found</h1>;
  }
  console.log('this is the data inside the component', userBookings)

  // normalize booking data
  const booking = doctorbooking || userBookings!;

  // get display details (depending on doctor vs user)
  const otherPerson = doctorbooking
    ? doctorbooking.userId  // doctor view -> show user info
    : userBookings!.doctorId; // user view -> show doctor info

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "booked":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-6 hover:shadow-medium transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{otherPerson.name}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(booking.date), "MMM dd, yyyy")} •{" "}
              {format(new Date(booking.startTime), "p")} -{" "}
              {format(new Date(booking.endTime), "p")}
            </p>
          </div>
        </div>
        <Badge className={getStatusColor(booking.status)}>
          {getStatusIcon(booking.status)}
          <span className="ml-1 capitalize">{booking.status}</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {booking.mode && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {booking.mode === "online" ? (
              <Video className="w-4 h-4" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            <span className="capitalize">{booking.mode} consultation</span>
          </div>
        )}

        {"phone" in otherPerson && otherPerson.phone && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{otherPerson.phone}</span>
          </div>
        )}

        {"email" in otherPerson && otherPerson.email && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{otherPerson.email}</span>
          </div>
        )}
      </div>
      {userBookings && cancelBooking && rescheduleBooking && <div className="flex  justify-between">
        <Button onClick={() => cancelBooking(booking._id!)}>Cancel Booking</Button>
        <Button onClick={() => rescheduleBooking(booking._id!)}>Reschedule Booking</Button>
      </div>}
    </Card>
  );
};
