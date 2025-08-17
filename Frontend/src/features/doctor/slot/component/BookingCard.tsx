// import type { PopulatedBookingForDoctor, BookingStatus, PopulatedBookingForUser } from "@/types/appointment/appointment";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Clock, User, Phone, Mail, Video, MapPin, CheckCircle, XCircle } from "lucide-react";
// import { format } from "date-fns";

// interface BookingCardProps {
//   doctorbooking?: PopulatedBookingForDoctor;
//   userBookings?: PopulatedBookingForUser

// }

// export const BookingCard = ({ doctorbooking, userBookings }: BookingCardProps) => {
//   if (!doctorbooking && !userBookings) return (
//     <>
//       <h1>NO Bookings found</h1>
//     </>
//   )
//   const getStatusColor = (status: BookingStatus) => {
//     switch (status) {
//       case "booked":
//         return "bg-primary text-primary-foreground";
//       case "completed":
//         return "bg-success text-success-foreground";
//       case "cancelled":
//         return "bg-destructive text-destructive-foreground";
//       default:
//         return "bg-secondary text-secondary-foreground";
//     }
//   };

//   const getStatusIcon = (status: BookingStatus) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4" />;
//       case "cancelled":
//         return <XCircle className="w-4 h-4" />;
//       default:
//         return <Clock className="w-4 h-4" />;
//     }
//   };

//   return (
//     <Card className="p-6 hover:shadow-medium transition-all duration-200">
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
//             <User className="w-5 h-5 text-primary" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-lg">{doctorbooking ? doctorbooking.userId.name : userBookings?.doctorId.name}</h3>
//             <p className="text-sm text-muted-foreground">
//               {format(new Date(doctorbooking ? doctorbooking.date : userBookings?.date), "MMM dd, yyyy")} • {new Date(doctorbooking ? doctorbooking.startTime : userBookings?.startTime).toDateString()} - {new Date(doctorbooking ? doctorbooking.endTime : userBookings?.endTime).toLocaleTimeString()}
//             </p>
//           </div>
//         </div>
//         <Badge className={getStatusColor(doctorbooking ? doctorbooking.status : userBookings?.status!)}>
//           {getStatusIcon(booking.status)}
//           <span className="ml-1 capitalize">{booking.status}</span>
//         </Badge>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         {booking.consultationType && (
//           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//             {booking.consultationType === "online" ? (
//               <Video className="w-4 h-4" />
//             ) : (
//               <MapPin className="w-4 h-4" />
//             )}
//             <span className="capitalize">{booking.consultationType} consultation</span>
//           </div>
//         )}

//         {booking.patientPhone && (
//           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//             <Phone className="w-4 h-4" />
//             <span>{booking.patientPhone}</span>
//           </div>
//         )}

//         {booking.patientEmail && (
//           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//             <Mail className="w-4 h-4" />
//             <span>{booking.patientEmail}</span>
//           </div>
//         )}
//       </div>

//     </Card>
//   );
// };
import type { 
  PopulatedBookingForDoctor, 
  BookingStatus, 
  PopulatedBookingForUser 
} from "@/types/appointment/appointment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Phone, Mail, Video, MapPin, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface BookingCardProps {
  doctorbooking?: PopulatedBookingForDoctor;
  userBookings?: PopulatedBookingForUser;
}

export const BookingCard = ({ doctorbooking, userBookings }: BookingCardProps) => {
  if (!doctorbooking && !userBookings) {
    return <h1>No Bookings found</h1>;
  }

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
    </Card>
  );
};
