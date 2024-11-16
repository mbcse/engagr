"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  Divider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { RangeDatepicker } from "chakra-dayzed-datepicker";

interface CustomizeDeliveryProps {
  dailyBudget: string;
  setDailyBudget: (budget: string) => void;
  dateRange: Date[];
  setDateRange: (range: Date[]) => void;
  paymentMethod: string | null;
  setPaymentMethod: (method: string | null) => void;
  handlePrevious: () => void;
  handleFinish: () => void;
}

const CustomizeDelivery: React.FC<CustomizeDeliveryProps> = ({
  dailyBudget,
  setDailyBudget,
  dateRange,
  setDateRange,
  paymentMethod,
  setPaymentMethod,
  handlePrevious,
  handleFinish,
}) => {
  const handleDateChange = (dates: Date[]) => {
    setDateRange(dates);
  };

  return (
    <Box p={6} maxWidth="800px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="md">
      {/* Budget & Schedule Section */}
      <VStack align="stretch" spacing={6} mb={8}>
        <Text fontSize="xl" fontWeight="bold">
          Budget & Schedule
        </Text>
        <Text color="gray.600" fontSize="sm">
          Set a budget that fits your needs and a date range to take more control of your spend.{" "}
          <Text as="span" color="blue.500" cursor="pointer" textDecoration="underline">
            Learn more
          </Text>
        </Text>

        <HStack spacing={4}>
          {/* Daily Budget */}
          <FormControl>
            <FormLabel>Daily Budget</FormLabel>
            <HStack>
              <Select width="80px" defaultValue="USD">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
              <Input
                type="number"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
              />
            </HStack>
          </FormControl>

          {/* Date Range Picker */}
          <FormControl>
            <FormLabel>Date Range</FormLabel>
            <RangeDatepicker
              selectedDates={dateRange}
              onDateChange={handleDateChange}
              configs={{ dateFormat: "yyyy-MM-dd" }}
            //   propsConfigs={{
            //     inputProps: {
            //       placeholder: "Select Date Range",
            //       icon: <CalendarIcon />,
            //     },
            //   }}
            />
          </FormControl>
        </HStack>
      </VStack>

      <Divider />

      {/* Payment Method Section */}
      <VStack align="stretch" spacing={6} mt={8}>
        <Text fontSize="xl" fontWeight="bold">
          Payment Method
        </Text>
        {!paymentMethod && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            You need to select a payment method.
          </Alert>
        )}
        <HStack justifyContent="space-between" mt={4}>
          <Text color="gray.600" fontSize="sm">
            No payment method selected
          </Text>
          <Button
            onClick={() => setPaymentMethod("Credit Card")}
            colorScheme="blue"
            variant="outline"
          >
            + Add Credit Card
          </Button>
        </HStack>
      </VStack>

      {/* Navigation Buttons */}
      <HStack justifyContent="space-between" mt={8}>
        <Button onClick={handlePrevious}>Back</Button>
        <Button colorScheme="blue" onClick={handleFinish}>
          Finish
        </Button>
      </HStack>
    </Box>
  );
};

export default CustomizeDelivery;
