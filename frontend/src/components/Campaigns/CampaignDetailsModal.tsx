
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

interface Campaign {
  id: number;
  name: string;
  targetAudience: string;
  payoutInfo: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CampaignDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
}

const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  if (!campaign) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Campaign Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold">Campaign Name:</Text>
          <Text mb={3}>{campaign.name}</Text>
          <Text fontWeight="bold">Target Audience:</Text>
          <Text mb={3}>{campaign.targetAudience}</Text>
          <Text fontWeight="bold">Payout Information:</Text>
          <Text mb={3}>{campaign.payoutInfo}</Text>
          <Text fontWeight="bold">Start Date:</Text>
          <Text mb={3}>{campaign.startDate}</Text>
          <Text fontWeight="bold">End Date:</Text>
          <Text mb={3}>{campaign.endDate}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>{campaign.description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CampaignDetailsModal;
