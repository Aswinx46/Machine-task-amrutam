import type{ DashboardBooking, BookingStatus } from "@/types/appointment/appointment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Phone, Mail, Video, MapPin, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface BookingCardProps {
  booking: DashboardBooking;
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
}

export const BookingCard = ({ booking, onStatusChange }: BookingCardProps) => {
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "booked":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
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
            <h3 className="font-semibold text-lg">{booking.patientName}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(booking.date), "MMM dd, yyyy")} • {booking.startTime} - {booking.endTime}
            </p>
          </div>
        </div>
        <Badge className={getStatusColor(booking.status)}>
          {getStatusIcon(booking.status)}
          <span className="ml-1 capitalize">{booking.status}</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {booking.consultationType && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {booking.consultationType === "online" ? (
              <Video className="w-4 h-4" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            <span className="capitalize">{booking.consultationType} consultation</span>
          </div>
        )}
        
        {booking.patientPhone && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{booking.patientPhone}</span>
          </div>
        )}
        
        {booking.patientEmail && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{booking.patientEmail}</span>
          </div>
        )}
      </div>

      {booking.notes && (
        <div className="mb-4 p-3 bg-secondary rounded-md">
          <p className="text-sm text-secondary-foreground">
            <strong>Notes:</strong> {booking.notes}
          </p>
        </div>
      )}

      {booking.status === "booked" && (
        <div className="flex space-x-2 pt-4 border-t">
          <Button
            size="sm"
            onClick={() => onStatusChange(booking._id!, "completed")}
            className="flex-1 bg-success hover:bg-success/90"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Complete
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStatusChange(booking._id!, "cancelled")}
            className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}
    </Card>
  );
};