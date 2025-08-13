import { Calendar, Clock, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DoctorHeaderProps {
  doctorName: string;
  onCreateSlot: () => void;
  stats: {
    todayBookings: number;
    totalSlots: number;
    completedToday: number;
  };
}

export const DoctorHeader = ({ doctorName, onCreateSlot, stats }: DoctorHeaderProps) => {
  return (
    <div className="bg-white border border-border rounded-lg p-6 mb-6 shadow-soft">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome back, Dr. {doctorName}</h1>
          <p className="text-muted-foreground">Manage your appointments and availability</p>
        </div>
        <Button 
          onClick={onCreateSlot}
          className="bg-primary text-primary-foreground hover:bg-primary-dark"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Slot
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary-light border-primary/20 p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Today's Bookings</p>
              <p className="text-2xl font-bold text-foreground">{stats.todayBookings}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-secondary border-border p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Available Slots</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalSlots}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-success-light border-success/20 p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
              <p className="text-2xl font-bold text-foreground">{stats.completedToday}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};