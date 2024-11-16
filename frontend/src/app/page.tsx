"use client";
import { Box, Flex } from "@chakra-ui/react";

import { Footer, Header, MainPane } from "@/components";
import { FloatingNav } from "@/components/Home/FloatingNav";
import { HeroScrollDemo } from "@/components/Home/ContainerScroll";
import { WobbleCardDemo } from "@/components/Home/WobbleCard";
import { Partners } from "@/components/Home/Partners";

export default function Home() {
  return (
    <Flex flexDirection="column" minHeight="100vh" className="pb-16">
      
      <div className="hidden">
        <Header />
        <Box as="main" flex={1} p={4}>
          <MainPane />
        </Box>

        <Footer />
      </div>

      <FloatingNav />

      <HeroScrollDemo />
      <Partners />
      <WobbleCardDemo />
    </Flex>
  );
}
