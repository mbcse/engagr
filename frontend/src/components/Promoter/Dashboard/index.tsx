"use client";

import React, { useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  Heading,
  HStack,
  Button,
  Icon,
  Flex,
  Spacer,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { FiUsers, FiBarChart2, FiDollarSign, FiPieChart } from "react-icons/fi";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

import axios from "axios";
import { useAccount } from "wagmi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
);

const fetchUser = async (twitter: string, address: string) => {
  try {
    if (!twitter || !address) {
      console.error("Twitter and address are required.");
      return;
    }
    const response = await axios.post("http://localhost:3002/engagr/get-register-promoter", {
      twitterUsername : twitter,
      accountAddress : address,
    });
    console.log(response, "response");
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const Dashboard = () => {
  // Data for line chart
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 10000, 7500, 12500, 20000, 17500],
        borderColor: "#63b3ed",
        backgroundColor: "rgba(99, 179, 237, 0.3)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Data for donut chart
  const donutChartData = {
    labels: ["Organic", "Paid", "Referral", "Social"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [45, 30, 15, 10],
        backgroundColor: ["#63b3ed", "#68d391", "#f6ad55", "#ed64a6"],
        hoverBackgroundColor: ["#4299e1", "#48bb78", "#dd6b20", "#d53f8c"],
        borderWidth: 2,
      },
    ],
  };

  // Options for donut chart with legend on the right
  const donutChartOptions = {
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: "#ffffff",
        },
      },
    },
  };

  // Data for bar chart (Campaign Performance)
  const barChartData = {
    labels: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"],
    datasets: [
      {
        label: "Campaign Performance",
        data: [80, 90, 70, 100],
        backgroundColor: ["#90cdf4", "#63b3ed", "#3182ce", "#2b6cb0"],
        borderWidth: 1,
      },
    ],
  };

  // Colors for dark/light mode
  const bg = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const chartContainerStyle = {
    p: "0.5rem",
    bg: cardBg,
    borderRadius: "md",
    boxShadow: "md",
    height: "250px",
    boxSizing: "border-box" as const,
  };

  const { user } = useDynamicContext();
  const account = useAccount()

  useEffect(() => {
    // const email = user?.email;
    const address = account?.address;
    const twitter = user?.verifiedCredentials?.find(
      (cred) => cred?.oauthProvider === "twitter",
    )?.oauthUsername;

    if (twitter && address) {
      console.log("fetching user...");
      fetchUser(twitter, address);
    }
  }, [user]);

  return (
    <Box p={8} bg={bg}>
      {!user ? (
        <div className="flex justify-center items-center h-[80vh]">
          <DynamicWidget variant="dropdown" innerButtonComponent="Login" />
        </div>
      ) : (
        <>
          <div className="flex justify-end items-end pb-4 w-full">
            <div className="w-60"></div>
            <DynamicWidget variant="dropdown" innerButtonComponent="Login" />
          </div>
          <Flex alignItems="center" mb={8}>
            <Heading size="lg" color={textColor}>
              Dashboard
            </Heading>
            <Spacer />
            <HStack spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                Balance: $12,345.67
              </Text>
            </HStack>
          </Flex>

          {/* Stat Cards */}
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
            <StatCard
              title="Total Users"
              stat="1,500"
              icon={FiUsers}
              change="+5%"
              cardBg={cardBg}
              textColor={textColor}
            />
            <StatCard
              title="Revenue"
              stat="$34,567"
              icon={FiDollarSign}
              change="+12%"
              cardBg={cardBg}
              textColor={textColor}
            />
            <StatCard
              title="Active Campaigns"
              stat="24"
              icon={FiBarChart2}
              change="-2%"
              cardBg={cardBg}
              textColor={textColor}
            />
            <StatCard
              title="Conversions"
              stat="320"
              icon={FiPieChart}
              change="+8%"
              cardBg={cardBg}
              textColor={textColor}
            />
          </SimpleGrid>

          {/* Charts Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
            {/* Line Chart */}
            <Box {...chartContainerStyle}>
              <Text fontWeight="bold" mb={2} color={textColor}>
                Revenue Over Time
              </Text>
              <Line data={lineChartData} />
            </Box>

            {/* Donut Chart */}
            <Box {...chartContainerStyle}>
              <Text fontWeight="bold" mb={2} color={textColor}>
                Traffic Sources
              </Text>
              <Doughnut data={donutChartData} options={donutChartOptions} />
            </Box>
          </SimpleGrid>

          {/* Full-width Campaign Performance Chart */}
          <Box
            p="0.5rem"
            bg={cardBg}
            borderRadius="md"
            boxShadow="md"
            width="100%"
            height="250px"
            boxSizing="border-box"
            as="section"
          >
            <Text fontWeight="bold" mb={2} color={textColor}>
              Campaign Performance
            </Text>
            <Line data={barChartData} />
          </Box>
        </>
      )}
      {/* Balance and Header */}
    </Box>
  );
};

interface StatCardProps {
  title: string;
  stat: string;
  icon: React.ElementType;
  change: string;
  cardBg: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, stat, icon, change, cardBg, textColor }) => {
  return (
    <Box p={4} bg={cardBg} borderRadius="md" boxShadow="md">
      <Center h="100%">
        <HStack>
          <Icon as={icon} boxSize={8} color="blue.500" />
          <Stat>
            <StatLabel color={textColor}>{title}</StatLabel>
            <StatNumber color={textColor}>{stat}</StatNumber>
            <StatHelpText color={change.startsWith("+") ? "green.400" : "red.400"}>
              <StatArrow type={change.startsWith("+") ? "increase" : "decrease"} />
              {change}
            </StatHelpText>
          </Stat>
        </HStack>
      </Center>
    </Box>
  );
};

export default Dashboard;
