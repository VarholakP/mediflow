import { Box, Flex, Text, Badge, Button } from "@chakra-ui/react";
import { LuCalendarDays, LuClock, LuFileText, LuMapPin } from "react-icons/lu";
import type { Appointment } from "./types";

interface AppointmentCardProps {
  appointment: Appointment;
  isHighlighted?: boolean;
}

function getDateAndTimeLabels(appointmentDate: string) {
  const d = new Date(appointmentDate);

  if (isNaN(d.getTime())) {
    return {
      dateLabel: appointmentDate,
      timeLabel: "",
    };
  }

  const dateLabel = d.toLocaleDateString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeLabel = d.toLocaleTimeString("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { dateLabel, timeLabel };
}

export function AppointmentCard({ appointment, isHighlighted }: AppointmentCardProps) {
  const { dateLabel, timeLabel } = getDateAndTimeLabels(appointment.appointmentDate);

  const now = new Date();
  const appDate = new Date(appointment.appointmentDate);
  const diffMs = appDate.getTime() - now.getTime();
  const isSoon = diffMs > 0 && diffMs <= 1000 * 60 * 60;

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
              {appointment.doctorName}
            </Text>
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
                <Text>{appointment.reason}</Text>
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
          minWidth="120px"
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
            width="120px"
            mb={2}
          >
            Reschedule
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderRadius="999px"
            width="120px"
          >
            Cancel
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
