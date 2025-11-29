import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { AppointmentCard } from "./AppointmentCard";
import type { Appointment } from "./types";

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await fetch("/api/appointment/appointments");

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data: Appointment[] = await res.json();
        setAppointments(data);
      } catch (err: any) {
        console.error("Error loading appointments:", err);
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  if (loading) {
    return <Text px={4} py={6}>Loading appointments…</Text>;
  }

  if (error) {
    return (
      <Box px={4} py={6}>
        <Text color="red.500">Failed to load appointments: {error}</Text>
      </Box>
    );
  }

  if (appointments.length === 0) {
    return (
      <Box px={4} py={6}>
        <Text>No appointments found.</Text>
      </Box>
    );
  }

  return (
    <Box w="100%" bg="gray.50" minH="100vh" py={10} px={{ base: 4, md: 8 }}>
      <Box maxW="5xl" mx="auto">
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            Upcoming Appointments
          </Text>
          <Text fontSize="sm" color="gray.600">
            Manage and view your scheduled medical appointments.
          </Text>
        </Box>

        {appointments.map((appt, index) => (
          <AppointmentCard
            key={`${appt.doctorName}-${appt.appointmentDate}-${index}`}
            appointment={appt}
            isHighlighted={index === 0}
          />
        ))}
      </Box>
    </Box>
  );
}
