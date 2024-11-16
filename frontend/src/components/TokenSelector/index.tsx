import React from "react";
import { Flex, VStack, Text, Image, Select, Box } from "@chakra-ui/react";

const TokenSelector = ({ selectedToken, setSelectedToken, tokens, chainId }: any) => {
  // Handle token selection
  const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddress = event.target.value;
    const selectedToken = tokens.find((token: any) => token.address === selectedAddress);
    if (selectedToken) setSelectedToken(selectedToken);
  };

  return (
    <VStack
      w="100%"
      minWidth="270px"
      gap={2}
      textAlign="left"
      alignItems="flex-start"
      className="text-gray-300"
    >
      <Flex direction="column" w="100%">
        <Select
          placeholder="Select a token"
          value={selectedToken?.address || ""}
          onChange={handleTokenChange}
          bg="white"
          borderColor="teal.500"
          borderRadius="md"
          className="text-gray-800"
        >
          {tokens.map((token: any) => (
            <option key={token.address} value={token.address}>
              {token.symbol} - {token.name}
            </option>
          ))}
        </Select>
        {/* {selectedToken && (
          <Box
            display="flex"
            alignItems="center"
            borderWidth="1px"
            borderRadius="md"
            borderColor="teal.500"
            p={3}
            bg="gray.50"
          >
            {selectedToken.image && (
              <Image
                src={selectedToken.image}
                alt={selectedToken.symbol}
                boxSize="32px"
                borderRadius="full"
                mr={3}
              />
            )}
            <Box>
              <Text fontWeight="bold">{selectedToken.name}</Text>
              <Text fontSize="sm" color="gray.600">
                {selectedToken.symbol}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Address: {selectedToken.address}
              </Text>
            </Box>
          </Box>
        )} */}
      </Flex>
    </VStack>
  );
};

export default TokenSelector;
