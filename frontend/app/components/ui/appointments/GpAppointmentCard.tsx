import { Box, Flex, Text, Badge, Button } from "@chakra-ui/react";
import { LuCalendarDays, LuClock, LuFileText, LuMapPin } from "react-icons/lu";
import type { Appointment } from "./types";

interface AppointmentCardProps {
  appointment: Appointment;
  isHighlighted?: boolean;
  onCreateAppointment?: (appointment: Appointment) => void; // 🔹 PRIDANÉ
}

function getDateAndTimeLabels(appointmentDate: string, timeSlot: string) {
  const d = new Date(appointmentDate);
  const hasValidDate = !isNaN(d.getTime());

  const dateLabel = hasValidDate
    ? d.toLocaleDateString("sk-SK", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : appointmentDate;

  const timeLabel =
    timeSlot ||
    (hasValidDate
      ? d.toLocaleTimeString("sk-SK", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "");

  return { dateLabel, timeLabel };
}

export function GpAppointmentCard({
  appointment,
  isHighlighted,
  onCreateAppointment,
}: AppointmentCardProps) {
  const { dateLabel, timeLabel } = getDateAndTimeLabels(
    appointment.appointmentDate,
    appointment.timeSlot
  );

  const now = new Date();

  let appDate = new Date(appointment.appointmentDate);
  const combined = new Date(`${appointment.appointmentDate}T${appointment.timeSlot}`);

  if (!isNaN(combined.getTime())) {
    appDate = combined;
  }

  const diffMs = appDate.getTime() - now.getTime();
  const isSoon = diffMs > 0 && diffMs <= 1000 * 60 * 60; // do 1 hodiny

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      borderColor={isHighlighted ? "purple.400" : "gray.200"}
      bg="white"
      px={6}
      py={5}
      boxShadow={isHighlighted ? "lg" : "sm"}
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.15s ease-out"
      mb={4}
    >
      <Flex justify="space-between" align="flex-start">
        <Box flex="1" mr={6}>
          <Box mb={4}>
            <Text fontWeight="semibold" fontSize="lg">
              {appointment.clinicianName}
            </Text>
            {appointment.specialization && (
              <Text fontSize="sm" color="purple.500">
                {appointment.specialization}
              </Text>
            )}
          </Box>

          <Flex
            direction={{ base: "column", md: "row" }}
            flexWrap="wrap"
            columnGap={8}
            rowGap={3}
            fontSize="sm"
            color="gray.600"
          >
            <Flex align="flex-start" minWidth="220px" mr={4} mb={3}>
              <Box as={LuCalendarDays} mt={1} mr={2} />
              <Box>
                <Text fontWeight="medium">Date</Text>
                <Text>{dateLabel}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="140px" mr={4} mb={3}>
              <Box as={LuClock} mt={1} mr={2} />
              <Box>
                <Text fontWeight="medium">Time</Text>
                <Text>{timeLabel}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="220px" mr={4} mb={3}>
              <Box as={LuFileText} mt={1} mr={2} />
              <Box>
                <Text fontWeight="medium">Reason for Visit</Text>
                <Text>{appointment.issue}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="220px" mr={4} mb={3}>
              <Box as={LuMapPin} mt={1} mr={2} />
              <Box>
                <Text fontWeight="medium">Location</Text>
                <Text>{appointment.address}</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box
          minWidth="160px"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
          {isSoon && (
            <Badge
              borderRadius="999px"
              px={3}
              py={1}
              colorScheme="purple"
              variant="subtle"
              mb={3}
            >
              Soon
            </Badge>
          )}
          <Button
            size="sm"
            colorScheme="purple"
            borderRadius="999px"
            width="160px"
            mb={2}
            onClick={() => onCreateAppointment?.(appointment)}
          >
            Create appointment
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
