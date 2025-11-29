export type AppointmentStatus = "Soon" | "Scheduled" | "Completed" | "Cancelled";

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  dateLabel: string; // napr. "Tuesday, December 2, 2025"
  timeLabel: string; // napr. "10:30 AM"
  reason: string;
  location: string;
  status: AppointmentStatus;
}
