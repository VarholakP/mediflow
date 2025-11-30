import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import {
  LuCalendarDays,
  LuClock,
  LuFileText,
  LuMapPin,
  LuUser,
} from "react-icons/lu";
import type { AdminAppointment } from "./AdminAppointments";

interface AdminDoctorAppointmentCardProps {
  appointment: AdminAppointment;
  isHighlighted?: boolean;
  onCreateAppointment?: (appointment: AdminAppointment) => void;
}

function getDateAndTimeLabels(appointmentDate: string, timeSlot?: string) {
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

export function AdminAppointmentCard({
  appointment,
  isHighlighted,
  onCreateAppointment,
}: AdminDoctorAppointmentCardProps) {
  const { dateLabel, timeLabel } = getDateAndTimeLabels(
    appointment.appointmentDate
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      borderColor={isHighlighted ? "#619DCD" : "gray.200"}
      bg="white"
      px={6}
      py={5}
      boxShadow={isHighlighted ? "0 0 10px #619DCD55" : "sm"}
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.15s ease-out"
      mb={4}
    >
      <Flex justify="space-between" align="flex-start">
        <Box flex="1" mr={6}>
          <Box mb={3}>
            <Flex align="center">
              <Box as={LuUser} mr={2} color="#619DCD" />
              <Text fontWeight="semibold" fontSize="lg" color="gray.800">
                {appointment.patientName}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Patient
            </Text>
          </Box>

          <Box mb={3}>
            <Text fontSize="sm" color="gray.600">
              Recommended doctor:&nbsp;
              <Text as="span" fontWeight="medium" color="gray.800">
                {appointment.doctorName}
              </Text>
            </Text>
            <Text fontSize="sm" color="gray.600">
              Specialization:&nbsp;
              <Text as="span" fontWeight="medium" color="#619DCD">
                {appointment.specialization}
              </Text>
            </Text>
          </Box>

          <Flex
            direction={{ base: "column", md: "row" }}
            flexWrap="wrap"
            columnGap={8}
            rowGap={3}
            fontSize="sm"
            color="gray.700"
          >
            <Flex align="flex-start" minWidth="200px" mr={4} mb={3}>
              <Box as={LuCalendarDays} mt={1} mr={2} color="#619DCD" />
              <Box>
                <Text fontWeight="medium" color="gray.600">Date</Text>
                <Text color="gray.800">{dateLabel}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="140px" mr={4} mb={3}>
              <Box as={LuClock} mt={1} mr={2} color="#619DCD" />
              <Box>
                <Text fontWeight="medium" color="gray.600">Time</Text>
                <Text color="gray.800">{timeLabel || "—"}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="220px" mr={4} mb={3}>
              <Box as={LuMapPin} mt={1} mr={2} color="#619DCD" />
              <Box>
                <Text fontWeight="medium" color="gray.600">Workplace</Text>
                <Text color="gray.800">{appointment.address}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="220px" mr={4} mb={3}>
              <Box as={LuFileText} mt={1} mr={2} color="#619DCD" />
              <Box>
                <Text fontWeight="medium" color="gray.600">Reason / problem</Text>
                <Text color="gray.800">{appointment.reason}</Text>
              </Box>
            </Flex>
          </Flex>

          <Badge
            mt={4}
            borderRadius="999px"
            px={3}
            py={1}
            bg="#619DCD22"
            color="#619DCD"
          >
            AI suggestion for doctor
          </Badge>
        </Box>

        <Box
          minWidth="160px"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        ></Box>
      </Flex>
    </Box>
  );
}
