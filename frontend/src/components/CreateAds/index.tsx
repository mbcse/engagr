"use client";

import React, { useState } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Button, HStack } from "@chakra-ui/react";
import ObjectiveSection from "./ObjectiveSection";
import CreateAd from "./CreateAd";
import CustomizeDelivery from "./CustomizeDelivery";

import { uploadFile } from "@/utils/ipfsHelper";
import { useAccount, useChainId } from "wagmi";
import { type MarketingGoal } from "./AllocateBudget";
import { getDefaultEthersSigner } from "@/utils/clientToEtherjsSigner";
import { ERC20ABI, TOKEN_ENGAGR_ABI, TOKEN_ENGAGR_CONTRACT_ADDRESS } from "@/config";
import { ethers } from "ethers";
import axios from "axios";

const CreateAds: React.FC = () => {
  // @ts-ignore
  const account = useAccount();
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

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const [marketingGoals, setMarketingGoals] = useState<MarketingGoal[]>(initialGoals);
  const [followerRange, setFollowerRange] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState<string>("");

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

  const chainId = useChainId();
  const tokenEngagrContractAddress = TOKEN_ENGAGR_CONTRACT_ADDRESS[chainId];

  // find here
  // const client = new SignProtocolClient(SpMode.OnChain, {
  //   chain: chainId,
  //   account: address,
  // });

  const tokenList = [
    {
      name: "Ethereum",
      address: "0x0000000000000000000000000000000000000000",
      symbol: "ETH",
      decimals: 18,
      image: "https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png",
    },
    {
      name: "USDC",
      address: "0xA512f02EEa71580CBB7B5C3017F1f80A365f8329",
      symbol: "USDC",
      decimals: 6,
      image:
        "https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213.png",
    },
  ];

  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [attestedLink, setAttestedLink] = useState("");

  const getTokenData = async () => {
    const signer = await getDefaultEthersSigner();
    let tokenContract = null;
    let tokenDecimals = null;
    let tokenSymbol = null;

    if (selectedToken.address === "0x0000000000000000000000000000000000000000") {
      tokenDecimals = 18;
      tokenSymbol = "ETH";
    } else {
      // Get token Contract
      tokenContract = new ethers.Contract(selectedToken.address, ERC20ABI, signer);
      // Get Token Decimal
      tokenDecimals = await tokenContract.decimals();

      // Get Token Symbol
      tokenSymbol = await tokenContract.symbol();
    }

    return { tokenContract, tokenDecimals, tokenSymbol };
  };

  const { address } = useAccount();

  const handleFinish = async () => {
    console.log("Campaign successfully created!", mediaFile);

    let ImageHash = await uploadFile(mediaFile);
    const LightHouseGateway = "https://gateway.lighthouse.storage/";
    ImageHash = ImageHash.replace("://", "/");
    const fullUrl = `${LightHouseGateway}${ImageHash}`;

    console.log(fullUrl, "treatImageHash", Number(durationMinutes), 'Number(durationMinutes)');

    const payload = {
      adDescription: adText,
      // websiteDetails,
      media: fullUrl,
      amountAllocated: dailyBudget,
      // dateRange,
      // paymentMethod,
      // mediaFile,
      chainId: chainId,
      endtimestamp: Math.floor(Date.now() / 1000) + Number(durationMinutes) * 60,
      requiredFollowers: followerRange,
      marketer: localStorage.getItem("user")?.trim(),
      objective: selectedObjective,
      // followerRange,
      // durationMinutes,
      shortUrl : attestedLinks
    };

    // transactions

    console.log(payload, "payload ----");
    let response;
    try {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_DEPLOYED_URL}/engagr/register-ad`,
        payload,
      );
      console.log(response, "response from server");
    } catch (error: any) {
      console.error("Error:", error.message);
    }

    const signer = await getDefaultEthersSigner();
    console.log(signer, "signer -----");

    const { tokenContract, tokenDecimals, tokenSymbol } = await getTokenData();
    console.log(tokenDecimals, tokenSymbol, "tokenDecimals, tokenSymbol");

    // @ts-nocheck
    const engagerContract = new ethers.Contract(
      tokenEngagrContractAddress,
      TOKEN_ENGAGR_ABI,
      signer,
    );

    console.log(engagerContract, "_engagerContract -----");

    console.log(tokenContract, "tokenContract -----");

    // Convert budget amount in decimals
    const budgetAmountInUnits = ethers.parseUnits(dailyBudget, tokenDecimals);
    console.log(budgetAmountInUnits, "budgetAmountInUnits -----");

    if (tokenContract) {
      console.log(address)
      console.log(engagerContract.address)
      const currentAllowance = await tokenContract.allowance(address, engagerContract.address);
      if (currentAllowance < budgetAmountInUnits) {
        const tx = await tokenContract.approve(engagerContract.address, budgetAmountInUnits);
        await tx.wait();
      }
    }

    try {
      console.log(  selectedToken.address, "selectedToken.address");
      const tx = await engagerContract.submitAd(
        response?.data.ad._id,
        response?.data.ad.adDescription,
        budgetAmountInUnits,
        selectedToken.address,
        response?.data.ad.endtimestamp,
        response?.data.ad.requiredFollowers
      , { value: tokenContract ?  0 : budgetAmountInUnits  });
      console.log(tx);
      await tx.wait();
      alert("Campaign successfully created!");
    } catch (error) {
      console.log(error);
      alert("Tx Error creating campaign");
    }
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
              attestedLink={attestedLink} setAttestedLink={setAttestedLink}
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
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              tokenList={tokenList}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CreateAds;
