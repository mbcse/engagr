"use client";

import { Box, SimpleGrid, Image, Heading } from "@chakra-ui/react";

interface Objective {
  type: string;
  image: string;
  description: string;
}

interface ObjectiveSectionProps {
  selectedObjective: string;
  setSelectedObjective: (type: string) => void;
}

const ObjectiveSection: React.FC<ObjectiveSectionProps> = ({
  selectedObjective,
  setSelectedObjective,
}) => {
  const objectives: Objective[] = [
    {
      type: "Reach",
      image: "https://ton.twimg.com/web-app-framework/simpleads/img/reach.b591f808e54e44c9bffe.png",
      description: "Get more people to see my ad.",
    },
    {
      type: "Engagements",
      image:
        "https://ton.twimg.com/web-app-framework/simpleads/img/engagements.e9880b4bcb4329fe3e73.png",
      description: "Get more likes, Retweets, replies and link clicks.",
    },
    {
      type: "Website Traffic",
      image:
        "https://ton.twimg.com/web-app-framework/simpleads/img/traffic.987790b4774c3325bad3.png",
      description: "Get more visitors to my website.",
    },
    {
      type: "Keywords",
      image:
        "https://ton.twimg.com/web-app-framework/simpleads/img/keywords.2695cbc727326a3b3d6d.png",
      description: "Reach users with high intent",
    },
  ];

  return (
    <Box textAlign="center" py={10} px={4} className="text-white">
      <Heading as="h2" size="xl" mb={8}>
        What's Your Objective?
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        {objectives.map((objective) => (
          <Box
            key={objective.type}
            bg={selectedObjective === objective.type ? "blue.700" : "gray.800"}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            textAlign="center"
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
            onClick={() => setSelectedObjective(objective.type)}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={objective.image}
              alt={objective.type}
              borderRadius="md"
              boxSize="120px"
              objectFit="cover"
              mb={4}
              className=""
            />
            <Heading size="md" mb={2}>
              {objective.type}
            </Heading>
            <p className="text-sm text-gray-400">{objective.description}</p>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ObjectiveSection;
