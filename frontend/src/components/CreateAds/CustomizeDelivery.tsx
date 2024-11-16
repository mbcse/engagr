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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import AllocateBudget, { type MarketingGoal } from "./AllocateBudget";

interface CustomizeDeliveryProps {
  dailyBudget: string;
  setDailyBudget: (budget: string) => void;
  durationMinutes: number;
  setDurationMinutes: (minutes: number) => void;
  paymentMethod: string | null;
  setPaymentMethod: (method: string | null) => void;
  handlePrevious: () => void;
  handleFinish: () => void;
  marketingGoals: MarketingGoal[];
  setMarketingGoals: (goals: MarketingGoal[]) => void;
  followerRange: number;
  setFollowerRange: (range: number) => void;
}

const CustomizeDelivery: React.FC<CustomizeDeliveryProps> = ({
  dailyBudget,
  setDailyBudget,
  durationMinutes,
  setDurationMinutes,
  paymentMethod,
  setPaymentMethod,
  handlePrevious,
  handleFinish,
  marketingGoals,
  setMarketingGoals,
  followerRange,
  setFollowerRange,
}) => {
  return (
    <Box
      p={6}
      maxWidth="800px"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      className="text-white"
    >
      {/* Budget & Schedule Section */}
      <VStack align="stretch" spacing={6} mb={8}>
        <Text fontSize="xl" fontWeight="bold">
          Budget & Schedule
        </Text>
        <Text color="gray.400" fontSize="sm">
          Set a budget that fits your needs and a duration in minutes for better control of your spend.
          <Text as="span" color="blue.500" cursor="pointer" textDecoration="underline">
            Learn more
          </Text>
        </Text>

        {/* Daily Budget Input */}
        <HStack spacing={4}>
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

          {/* Duration Input in Minutes */}
          <FormControl>
            <FormLabel>Duration (Minutes)</FormLabel>
            <Input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              placeholder="e.g., 60"
            />
          </FormControl>
        </HStack>
      </VStack>

      {/* Follower Range Selector */}
      <VStack align="stretch" spacing={6} mb={8}>
        <Text fontSize="xl" fontWeight="bold">
          Select Follower Range
        </Text>
        <FormControl>
          <FormLabel>Follower Count (0 - 100)</FormLabel>
          <Slider
            aria-label="follower-range-slider"
            defaultValue={followerRange}
            min={0}
            max={100}
      
            onChange={(value) => setFollowerRange(value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt={2} textAlign="right">
            {followerRange.toLocaleString()} followers
          </Text>
        </FormControl>
      </VStack>

      {/* Payment Method Section */}
      <VStack align="stretch" spacing={6} mt={8}>
        <Text fontSize="xl" fontWeight="bold">
          Payment Method
        </Text>
        {!paymentMethod && (
          <Alert status="error" borderRadius="md" className="text-black">
            <AlertIcon />
            You need to select a payment method.
          </Alert>
        )}
        <HStack justifyContent="space-between" mt={4} mb={8}>
          <Text color="gray.300" fontSize="sm">
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

      <Divider />

      {/* Allocate Budget Component */}
      <AllocateBudget
        marketingGoals={marketingGoals}
        setMarketingGoals={setMarketingGoals}
        handleFinish={handleFinish}
      />

      {/* Navigation Buttons */}
      <HStack justifyContent="space-between" mt={8}>
        <Button onClick={handlePrevious}>Back</Button>
      </HStack>
    </Box>
  );
};

export default CustomizeDelivery;
