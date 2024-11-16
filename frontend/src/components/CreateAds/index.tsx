"use client";

import React, { useState } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Button, HStack } from "@chakra-ui/react";
import ObjectiveSection from "./ObjectiveSection";
import CreateAd from "./CreateAd";
import CustomizeDelivery from "./CustomizeDelivery";

import { uploadFile } from "@/utils/ipfsHelper";
import { useAccount } from "wagmi";
import axios from "axios";
import { type MarketingGoal } from "./AllocateBudget";

const CreateAds: React.FC = () => {
  // States for objectives
  const [selectedObjective, setSelectedObjective] = useState<string>("");

  // States for ad creation
  const [adText, setAdText] = useState<string>("");
  const [attestedLinks, setAttestedLinks] = useState<string>("");
  const [media, setMedia] = useState<string | null>(null); // Uploaded media
  const [mediaFile, setMediaFile] = useState<FileList | null>(null); // Uploaded media

  // States for delivery customization
  const [dailyBudget, setDailyBudget] = useState<string>("50.00");

  // Define marketing goals
  const initialGoals: MarketingGoal[] = [
    { goal: "Reach", percentage: 30 },
    { goal: "Clicks", percentage: 40 },
    { goal: "Comments", percentage: 30 },
  ];

  // Updated: Changed dateRange to use Date[]
  const [dateRange, setDateRange] = useState<Date[]>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)), // Default to a week from now
  ]);

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const [marketingGoals, setMarketingGoals] = useState<MarketingGoal[]>(initialGoals);
  const [followerRange, setFollowerRange] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(0)

  // Tab navigation
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleNext = () => {
    if (activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const { chainId, address } = useAccount();

  const handleFinish = async () => {
    console.log("Campaign successfully created!", mediaFile);

    let ImageHash = await uploadFile(mediaFile);
    const LightHouseGateway = "https://gateway.lighthouse.storage/";
    ImageHash = ImageHash.replace("://", "/");
    const fullUrl = `${LightHouseGateway}${ImageHash}`;

    console.log(fullUrl, "treatImageHash");

    const payload = {
      adDescription: adText,
      // websiteDetails,
      media: fullUrl,
      amountAllocated: dailyBudget,
      // dateRange,
      // paymentMethod,
      // mediaFile,
      chainId: chainId,
      endtimestamp: Math.floor(Date.now() / 1000) + 10 * 60,
      requiredFollowers: 10,
      marketer: localStorage.getItem("user")?.trim(),
      objective: selectedObjective,
      followerRange, 
      durationMinutes
    };

    console.log(payload, "payload ----");
    // try {
    //   const response = await axios.post("http://localhost:3002/engagr/register-ad", payload);
    //   console.log(response, "response from server");
    // } catch (error: any) {
    //   console.error("Error:", error.message);
    // }

    alert("Campaign successfully created!");
  };

  return (
    <Box p={8} maxWidth="1200px" mx="auto" className="h-[90vh]">
      <Tabs index={activeTab} onChange={(index) => setActiveTab(index)} isFitted>
        <TabList mb={4} className="text-white">
          <Tab>Choose Objective</Tab>
          <Tab isDisabled={!selectedObjective}>Create Ad</Tab>
          <Tab isDisabled={!selectedObjective}>Customize Delivery</Tab>
        </TabList>

        <TabPanels>
          {/* Step 1: Choose Objective */}
          <TabPanel>
            <ObjectiveSection
              selectedObjective={selectedObjective}
              setSelectedObjective={setSelectedObjective}
            />
            <HStack justifyContent="space-between" mt={8}>
              <Button onClick={handlePrevious} isDisabled>
                Back
              </Button>
              <Button colorScheme="blue" onClick={handleNext} isDisabled={!selectedObjective}>
                Next
              </Button>
            </HStack>
          </TabPanel>

          {/* Step 2: Create Ad */}
          <TabPanel>
            <CreateAd
              adText={adText}
              setAdText={setAdText}
              websiteDetails={attestedLinks}
              setWebsiteDetails={setAttestedLinks}
              media={media}
              setMedia={setMedia}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              setMediaFile={setMediaFile}
            />
          </TabPanel>

          {/* Step 3: Customize Delivery */}
          <TabPanel>
            <CustomizeDelivery
              dailyBudget={dailyBudget}
              setDailyBudget={setDailyBudget}
              durationMinutes={durationMinutes}
              setDurationMinutes={setDurationMinutes}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handlePrevious={handlePrevious}
              handleFinish={handleFinish}
              marketingGoals={marketingGoals}
              setMarketingGoals={setMarketingGoals}
              followerRange={followerRange}
              setFollowerRange={setFollowerRange}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CreateAds;
