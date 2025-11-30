
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { AdminAppointmentCard } from "./AdminAppointmentCards";
import type { AdminAppointment } from "./AdminAppointments";

export function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5209/api/DoctorAgent/getAllAppointments"
        );

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data: AdminAppointment[] = await res.json();
        setAppointments(data);
      } catch (err: any) {
        console.error("Error loading doctor appointments:", err);
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  if (loading) {
    return (
      <Text px={4} py={6}>
        Loading AI suggested appointments…
      </Text>
    );
  }

  if (error) {
    return (
      <Box px={4} py={6}>
        <Text color="red.500">
          Failed to load doctor appointments: {error}
        </Text>
      </Box>
    );
  }

  if (appointments.length === 0) {
    return (
      <Box px={4} py={6}>
        <Text>No suggested appointments found.</Text>
      </Box>
    );
  }

  // handler na klik "Create appointment" – zatiaľ len placeholder
  const handleCreateAppointment = (appt: AdminAppointment) => {
    console.log("Create real appointment from suggestion:", appt);
    // tu neskôr spravíš POST na backend alebo otvoríš modal/form
  };

  return (
    <Box w="100%" bg="gray.50" minH="100vh" py={10} px={{ base: 4, md: 8 }}>
      <Box maxW="5xl" mx="auto">
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            AI suggested appointments for doctors
          </Text>
          <Text fontSize="sm" color="gray.600">
            Review AI suggestions and convert them into real appointments.
          </Text>
        </Box>

        {appointments.map((appt, index) => (
          <AdminAppointmentCard
            key={`${appt.patientName}-${appt.appointmentDate}-${index}`}
            appointment={appt}
            isHighlighted={index === 0}
            onCreateAppointment={handleCreateAppointment}
          />
        ))}
      </Box>
    </Box>
  );
}

