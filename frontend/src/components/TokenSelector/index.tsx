import React from "react";
import { Flex, VStack ,Select } from "@chakra-ui/react";

const TokenSelector = ({ selectedToken, setSelectedToken, tokens }: any) => {
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
       
      </Flex>
    </VStack>
  );
};

export default TokenSelector;
