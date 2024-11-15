"use client";
import { Box, Flex } from "@chakra-ui/react";

import { Footer, Header, MainPane } from "@/components";
import { FloatingNav } from "@/components/Home/FloatingNav";
import { HeroScrollDemo } from "@/components/Home/ContainerScroll";
import CardContainer from "@/components/Home/CardContainer";
import { WobbleCardDemo } from "@/components/Home/WobbleCard";
import type { CardProps } from "@/components/Home/Card";
import { Partners } from "@/components/Home/Partners";

const featuredCards: CardProps[] = [
  {
    imageSrc:
      "https://cdn.8thwall.com/apps/cover/2nzle4cqa0ebbsb4yh1dg1aex16qlygzll0qu9dg06xf97f8a9u8l6qt-preview-600x315",
    profileSrc:
      "https://cdn.8thwall.com/web/accounts/icons/2nzvv6rsam7wd7jw7yv4kzdu2t9qff70dazadeium87gaaobvncrr60o-40x40",
    title: "Pause with Peridot",
    subtitle: "Periodt",
    linkUrl: "https://twitter.com/mannupaaji",
  },
  {
    imageSrc:
      "https://cdn.8thwall.com/apps/cover/2nzle4cqa0ebbsb4yh1dg1aex16qlygzll0qu9dg06xf97f8a9u8l6qt-preview-600x315",
    profileSrc:
      "https://cdn.8thwall.com/web/accounts/icons/2nzvv6rsam7wd7jw7yv4kzdu2t9qff70dazadeium87gaaobvncrr60o-40x40",
    title: "Augmented Reality Experience",
    subtitle: "Explore Now",
    linkUrl: "https://example.com",
  },
];

export default function Home() {
  return (
    <Flex flexDirection="column" minHeight="100vh" className="">
      <div className="hidden">
        <Header />
        <Box as="main" flex={1} p={4}>
          <MainPane />
        </Box>

        <Footer />
      </div>

      <FloatingNav />

      <HeroScrollDemo />

      <CardContainer
        title="Featured"
        description="Our Editor's pick of web-based augmented reality applications you can experience directly in your browser—no app required."
        cards={[...featuredCards, ...featuredCards, ...featuredCards]}
      />
      <CardContainer
        title="Games"
        description="Challenge yourself to a game in another dimension or invite others to engage in immersive play with these WebAR games."
        cards={featuredCards}
      />

      <Partners />
      <WobbleCardDemo />
    </Flex>
  );
}
