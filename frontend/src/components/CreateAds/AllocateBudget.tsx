"use client";


import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export type MarketingGoal = {
    goal: string;
    percentage: number;
  };
  

interface AllocateBudgetProps {
  marketingGoals: MarketingGoal[];
  setMarketingGoals: (goals: MarketingGoal[]) => void;
  handleFinish: () => void;
}

const AllocateBudget: React.FC<AllocateBudgetProps> = ({
  marketingGoals,
  setMarketingGoals,
  handleFinish,
}) => {
  // Calculate total percentage allocated
  const totalPercentage = marketingGoals.reduce((acc, goal) => acc + goal.percentage, 0);

  // Handle input change for each goal's percentage
  const handlePercentageChange = (index: number, value: string) => {
    const newGoals = [...marketingGoals];
    const percentage = parseFloat(value) || 0;
    newGoals[index].percentage = percentage;
    setMarketingGoals(newGoals);
  };

  return (
    
      <VStack align="stretch" spacing={6} className="py-8">
        <Text fontSize="xl" fontWeight="bold">
          Distribute Budget Across Marketing Goals
        </Text>
        {marketingGoals.map((goal, index) => (
          <FormControl key={goal.goal}>
            <FormLabel>{goal.goal}</FormLabel>
            <HStack>
              <Input
                type="number"
                value={goal.percentage}
                onChange={(e) => handlePercentageChange(index, e.target.value)}
              />
              <Text>%</Text>
            </HStack>
          </FormControl>
        ))}

        {/* Show error if total percentage is not 100 */}
        {totalPercentage !== 100 && (
          <Alert status="error" borderRadius="md" className="text-black">
            <AlertIcon />
            <span className="">Total allocation must equal 100%. Currently: {totalPercentage}%</span>
          </Alert>
        )}

        <Button
          colorScheme="blue"
          onClick={handleFinish}
          isDisabled={totalPercentage !== 100}
        >
          Finish
        </Button>
      </VStack>

  );
};

export default AllocateBudget;
