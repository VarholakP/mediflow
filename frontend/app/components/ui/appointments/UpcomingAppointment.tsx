import { Box, Text } from "@chakra-ui/react";
import { AppointmentCard } from "./AppointmentCard";
import type { Appointment } from "./types";

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Mitchell",
    specialty: "General Practitioner",
    dateLabel: "Tuesday, December 2, 2025",
    timeLabel: "10:30 AM",
    reason: "Annual checkup and blood pressure monitoring",
    location: "Main Medical Center, Room 305",
    status: "Soon",
  },
  {
    id: "2",
    doctorName: "Dr. James Chen",
    specialty: "Cardiologist",
    dateLabel: "Friday, December 5, 2025",
    timeLabel: "2:00 PM",
    reason: "Follow-up consultation for heart condition",
    location: "Cardiology Wing, 2nd Floor",
    status: "Scheduled",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    dateLabel: "Monday, December 8, 2025",
    timeLabel: "9:15 AM",
    reason: "Evaluation of skin rash and irritation",
    location: "Dermatology Clinic, Room 210",
    status: "Scheduled",
  },
];

export function UpcomingAppointments() {
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

        {mockAppointments.map((appt, index) => (
          <AppointmentCard
            key={appt.id}
            appointment={appt}
            isHighlighted={index === 0}
          />
        ))}
      </Box>
    </Box>
  );
}
