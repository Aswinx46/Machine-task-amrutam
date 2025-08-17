

export interface ITiming {
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  bookedBy?:   string;
  consultationDuration: number;
  price: string;
  mode: "online" | "in-person";
  status: "active" | "inactive" | "expired";
}

export interface IDoctor {
  name: string;
  specialization: string;
}

export interface ISlot {
  _id:   string;
  doctorId:   string;
  date: Date;
  timings: ITiming[];
  doctor: IDoctor;
}

export interface IGroupedSlot {
  date: Date;
  slots: ISlot[];
}
