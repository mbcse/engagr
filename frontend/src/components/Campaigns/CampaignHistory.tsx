"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  HStack,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CampaignDetailsModal from "./CampaignDetailsModal";

// Dummy campaign data generator
const generateDummyData = (count: number) => {
  const campaigns = [];
  for (let i = 1; i <= count; i++) {
    campaigns.push({
      id: i,
      name: `Campaign ${i}`,
      targetAudience: `Audience ${i}`,
      payoutInfo: `$${(Math.random() * 1000).toFixed(2)}`,
      startDate: new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString(),
      endDate: new Date(new Date().setDate(new Date().getDate() + i)).toLocaleDateString(),
      description: `This is a detailed description of Campaign ${i}.`,
    });
  }
  return campaigns;
};

// Generate 50 rows of dummy data
const campaigns = generateDummyData(50);

const CampaignHistoryTable = () => {
  const hoverBg = "gray.700";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(campaigns.length / rowsPerPage);

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Get the data for the current page
  const currentData = campaigns.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleRowClick = (campaign: any) => {
    setSelectedCampaign(campaign);
    onOpen();
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box p={8} maxWidth="1200px" mx="auto" height="90vh">
      <Text fontSize="2xl" mb={6} fontWeight="bold" className="text-gray-300">
        Campaign History
      </Text>
      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        overflowY="auto"
        className="text-gray-300"
      >
        <Table variant="simple">
          <Thead className="text-gray-300">
            <Tr>
              <Th>Campaign ID</Th>
              <Th>Target Audience</Th>
              <Th>Amount</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((campaign) => (
              <Tr
                key={campaign.id}
                onClick={() => handleRowClick(campaign)}
                _hover={{ bg: hoverBg, cursor: "pointer" }}
              >
                <Td>{campaign.name}</Td>
                <Td>{campaign.targetAudience}</Td>
                <Td>{campaign.payoutInfo}</Td>
                <Td>{campaign.startDate}</Td>
                <Td>{campaign.endDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <HStack justifyContent="center" spacing={4} mt={4} className="text-gray-300">
        <Button onClick={handlePreviousPage} isDisabled={currentPage === 1} colorScheme="blue">
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button onClick={handleNextPage} isDisabled={currentPage === totalPages} colorScheme="blue">
          Next
        </Button>
      </HStack>

      {/* Campaign Details Modal */}
      <CampaignDetailsModal isOpen={isOpen} onClose={onClose} campaign={selectedCampaign} />
    </Box>
  );
};

export default CampaignHistoryTable;
