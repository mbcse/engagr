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
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
      <Text fontSize="2xl" mb={6} fontWeight="bold" color="gray.300">
        Campaign History
      </Text>
      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        overflowY="auto"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="white">Campaign ID</Th>
              <Th color="white">Target Audience</Th>
              <Th color="white">Amount</Th>
              <Th color="white">Start Date</Th>
              <Th color="white">End Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((campaign) => (
              <Tr
                key={campaign.id}
                onClick={() => handleRowClick(campaign)}
                _hover={{ bg: hoverBg, cursor: "pointer" }}
              >
                <Td color="white">{campaign.name}</Td>
                <Td color="white">{campaign.targetAudience}</Td>
                <Td color="white">{campaign.payoutInfo}</Td>
                <Td color="white">{campaign.startDate}</Td>
                <Td color="white">{campaign.endDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <HStack justifyContent="center" spacing={4} mt={4} mb={4} color="gray.300">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          aria-label="Previous Page"
          colorScheme="blue"
        />
        
        {/* Page number buttons */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            isActive={currentPage === index + 1}
            colorScheme="blue"
            variant={currentPage === index + 1 ? "solid" : "outline"}
          >
            {index + 1}
          </Button>
        ))}

        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          aria-label="Next Page"
          colorScheme="blue"
        />
      </HStack>

      {/* Campaign Details Modal */}
      <CampaignDetailsModal isOpen={isOpen} onClose={onClose} campaign={selectedCampaign} />
    </Box>
  );
};

export default CampaignHistoryTable;
