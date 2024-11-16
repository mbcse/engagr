import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaEye,
  FaMousePointer,
  FaMoneyBillWave,
  FaHeart,
  FaShareAlt,
  FaChartLine,
} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Campaign {
  id: number;
  name: string;
  targetAudience: string;
  payoutInfo: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CampaignDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
}

const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  if (!campaign) return null;

  // Sample data for the chart
  const barData = {
    labels: ["Clicks", "Conversions", "Earnings", "Views", "Likes", "Shares"],
    datasets: [
      {
        label: "Performance Metrics",
        data: [300, 80, 500, 450, 200, 150], // Replace with dynamic data
        backgroundColor: [
          "#1E293B",
          "#334155",
          "#475569",
          "#64748B",
          "#94A3B8",
          "#CBD5E1",
        ],
        borderColor: "#0F172A",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="lg"
        bg="#0F172A"
        color="white"
        maxWidth="900px"
        minWidth="700px"
        height="500px"
      >
        <ModalHeader>Campaign Overview</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex direction="row" gap={6} height="100%">
            {/* Left Section: Campaign Details */}
            <Box flex="1" bg="whiteAlpha.200" p={4} borderRadius="md">
  <Text fontSize="lg" fontWeight="bold" mb={4}>
    Campaign Details
  </Text>
  <Flex direction="column" gap={6}>
    <Text>
      <strong>Name:</strong> {campaign.name}
    </Text>
    <Text>
      <strong>Target Audience:</strong> {campaign.targetAudience}
    </Text>
    <Text>
      <strong>Payout Info:</strong> {campaign.payoutInfo}
    </Text>
    <Text>
      <strong>Start Date:</strong> {campaign.startDate}
    </Text>
    <Text>
      <strong>End Date:</strong> {campaign.endDate}
    </Text>
  </Flex>
</Box>


            {/* Right Section: Metrics + Chart */}
{/* Right Section: Metrics + Chart */}
<Box flex="2" p={4} bg="whiteAlpha.200" borderRadius="md">
  <Flex direction="column" height="100%">
    {/* Metrics */}
    <Box mb={6}>
      <Flex direction="row" gap={6}>
        {/* Left Column */}
        <Box flex="1">
          <HStack spacing={4} mb={4}>
            <Icon as={FaMousePointer} boxSize={5} />
            <Text>Clicks: 300</Text>
          </HStack>
          <HStack spacing={4} mb={4}>
            <Icon as={FaChartLine} boxSize={5} />
            <Text>Conversions: 80</Text>
          </HStack>
          <HStack spacing={4} mb={4}>
            <Icon as={FaMoneyBillWave} boxSize={5} />
            <Text>Earnings: $500</Text>
          </HStack>
        </Box>
        
        {/* Right Column */}
        <Box flex="1">
          <HStack spacing={4} mb={4}>
            <Icon as={FaEye} boxSize={5} />
            <Text>Views: 450</Text>
          </HStack>
          <HStack spacing={4} mb={4}>
            <Icon as={FaHeart} boxSize={5} />
            <Text>Likes: 200</Text>
          </HStack>
          <HStack spacing={4}>
            <Icon as={FaShareAlt} boxSize={5} />
            <Text>Shares: 150</Text>
          </HStack>
        </Box>
      </Flex>
    </Box>

    {/* Chart */}
    {/* Chart */}
<Box flex="1">
  <Bar
    data={barData}
    options={{
      responsive: true,
      plugins: { legend: { display: false } },
      maintainAspectRatio: false,
    }}
    height={200} // Set a smaller height for the chart
  />
</Box>

  </Flex>
</Box>
      </Flex> 
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CampaignDetailsModal;
