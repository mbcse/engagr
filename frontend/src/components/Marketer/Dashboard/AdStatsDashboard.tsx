import React from "react";
import {
  Box,
  Grid,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEye, FaThumbsUp, FaShareAlt, FaChartLine } from "react-icons/fa";

interface AdStatsDashboardProps {
  views: number;
  likes: number;
  shares: number;
  engagements: number;
}

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement;
  label: string;
  value: number;
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="md" textAlign="center">
      <VStack spacing={3}>
        {icon}
        <Stat>
          <StatLabel fontWeight="bold">{label}</StatLabel>
          <StatNumber fontSize="2xl">{value.toLocaleString()}</StatNumber>
        </Stat>
      </VStack>
    </Box>
  );
};

const AdStatsDashboard: React.FC<AdStatsDashboardProps> = ({
  views,
  likes,
  shares,
  engagements,
}) => {
  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {/* Stat Cards */}
        <StatCard icon={<FaEye size={30} color="#4299E1" />} label="Views" value={views} />
        <StatCard icon={<FaThumbsUp size={30} color="#48BB78" />} label="Likes" value={likes} />
        <StatCard icon={<FaShareAlt size={30} color="#F6AD55" />} label="Shares" value={shares} />
        <StatCard
          icon={<FaChartLine size={30} color="#ED64A6" />}
          label="Engagements"
          value={engagements}
        />
      </Grid>
    </Box>
  );
};

export default AdStatsDashboard;
