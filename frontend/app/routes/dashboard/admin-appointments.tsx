import { AdminDoctorAppointmentsPage } from "~/components/ui/appointments/AdminAppointmentsPage";

export function loader() {
  return null;
}

export default function AppointmentsRoute() {
  return <AdminDoctorAppointmentsPage />;
}
