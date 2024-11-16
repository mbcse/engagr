"use client";

import React, { useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Textarea,
  Input,
  Image,
  FormControl,
  FormLabel,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface CreateAdProps {
  adText: string;
  setAdText: (text: string) => void;
  websiteDetails: string;
  setWebsiteDetails: (details: string) => void;
  media: string | null;
  setMedia: (media: string | null) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  mediaFile : FileList | null,
  setMediaFile : (media: File | null) => void;
}

const CreateAd: React.FC<CreateAdProps> = ({
  adText,
  setAdText,
  websiteDetails,
  setWebsiteDetails,
  media,
  setMedia,
  handlePrevious,
  handleNext,
  setMediaFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setMediaFile(event.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <HStack alignItems="flex-start" spacing={8} className="">
      {/* Left Section: Ad Creation Form */}
      <VStack align="stretch" flex="1">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Create a website traffic ad
        </Text>
        <FormControl>
          <FormLabel>Ad text (required)</FormLabel>
          <Textarea
            placeholder="What's happening?"
            value={adText}
            onChange={(e) => setAdText(e.target.value)}
            size="lg"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Website details (required)</FormLabel>
          <Input
            placeholder="Enter website URL"
            value={websiteDetails}
            onChange={(e) => setWebsiteDetails(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Add media</FormLabel>
          <Button leftIcon={<AddIcon />} onClick={handleUploadClick} colorScheme="blue" variant="solid">
            Upload Image
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleMediaUpload}
            display="none"
          />
        </FormControl>

        <Text mt={4} fontSize="sm" color="gray.500">
          NOTE: Launching this ad will create a promoted-only Tweet.
        </Text>

        <HStack justifyContent="space-between" w="100%" mt={8}>
          <Button onClick={handlePrevious}>Back</Button>
          <Button colorScheme="blue" onClick={handleNext}>
            Next
          </Button>
        </HStack>
      </VStack>

      {/* Right Section: Ad Preview */}
      <Box flex="1" bg="gray.50" borderRadius="md" p={6} boxShadow="md" className="text-gray-800">
        <Text fontWeight="bold" mb={4}>
          Preview
        </Text>
        <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
          <HStack alignItems="center">
            <Image
              borderRadius="full"
              boxSize="40px"
              src="https://via.placeholder.com/40"
              alt="Profile"
            />
            <VStack align="stretch" spacing={0}>
              <Text fontWeight="bold">Your Profile</Text>
              <Text fontSize="sm" color="gray.500">
                @username
              </Text>
            </VStack>
          </HStack>
          <Divider my={4} />
          <Text>{adText || "What's happening?"}</Text>
          {websiteDetails && (
            <Text mt={2} color="blue.500">
              {websiteDetails}
            </Text>
          )}
          {media && <Image src={media} alt="Uploaded Media" borderRadius="md" mt={4} />}
          <Text mt={4} fontSize="sm" color="gray.500">
            Promoted
          </Text>
        </Box>
      </Box>
    </HStack>
  );
};

export default CreateAd;
