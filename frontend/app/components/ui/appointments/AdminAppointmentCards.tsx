import { Box, Flex, Text, Badge, Button } from "@chakra-ui/react";
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

function getDateAndTimeLabels(appointmentDate: string) {
  const d = new Date(appointmentDate);
  const hasValidDate = !isNaN(d.getTime());

  const dateLabel = hasValidDate
    ? d.toLocaleDateString("sk-SK", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : appointmentDate;

  const timeLabel = hasValidDate
    ? d.toLocaleTimeString("sk-SK", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

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
        {/* ľavá strana – info pre lekára */}
        <Box flex="1" mr={6}>
          {/* pacient */}
          <Box mb={3}>
            <Flex align="center">
              <Box as={LuUser} mr={2} />
              <Text fontWeight="semibold" fontSize="lg">
                {appointment.patientName}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Patient
            </Text>
          </Box>

          {/* odporúčaný doktor + špecializácia */}
          <Box mb={3}>
            <Text fontSize="sm" color="gray.600">
              Recommended doctor:&nbsp;
              <Text as="span" fontWeight="medium">
                {appointment.doctorName}
              </Text>
            </Text>
            <Text fontSize="sm" color="gray.600">
              Specialization:&nbsp;
              <Text as="span" fontWeight="medium">
                {appointment.specialization}
              </Text>
            </Text>
          </Box>

          {/* info bloky */}
          <Flex
            direction={{ base: "column", md: "row" }}
            flexWrap="wrap"
            columnGap={8}
            rowGap={3}
            fontSize="sm"
            color="gray.600"
          >
            <Flex align="flex-start" minWidth="200px" mr={4} mb={3}>
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
                <Text>{timeLabel || "—"}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="220px" mr={4} mb={3}>
              <Box as={LuMapPin} mt={1} mr={2} />
              <Box>
                <Text fontWeight="medium">Workplace</Text>
                <Text>{appointment.address}</Text>
              </Box>
            </Flex>

            <Flex align="flex-start" minWidth="220px" mr={4} mb={3}>
              <Box as={LuFileText} mt={1} mr={2} />
              <Box>
                <Text fontWeight="medium">Reason / problem</Text>
                <Text>{appointment.reason}</Text>
              </Box>
            </Flex>
          </Flex>

          <Badge
            mt={4}
            borderRadius="999px"
            px={3}
            py={1}
            colorScheme="purple"
            variant="subtle"
          >
            AI suggestion for doctor
          </Badge>
        </Box>

        {/* pravá strana – akcie pre lekára/admina */}
        <Box
          minWidth="160px"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
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

          <Button
            size="sm"
            variant="outline"
            borderRadius="999px"
            width="160px"
          >
            View details
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
