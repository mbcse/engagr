import { useColorModeValue } from "@chakra-ui/react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const fetchUser = async (accountAddress: string, email: string) => {
  try {
    if (!accountAddress || !email) {
      console.error("Twitter and address are required.");
      return;
    }
    const response = await axios.post("http://localhost:3002/engagr/get-register-marketer", {
      accountAddress,
      email,
    });
    console.log(response, "response");

    localStorage.setItem("user", response.data.userId);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const MarketDashboard = () => {
  const { user } = useDynamicContext();
  const account = useAccount();

  const bg = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    const email = user?.email;
    const address = account?.address;

    if (email && address) {
      console.log("fetching user...");
      fetchUser(address, email);
    }
  }, [user]);

  return (
    <Box p={8} bg={bg}>
      {user ? (
        <div>
          <div className="flex justify-end items-end pb-4 w-full">
            <div className="w-60"></div>
            <DynamicWidget variant="dropdown" innerButtonComponent="Login" />
          </div>
          <div>MarketDashboard</div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <DynamicWidget variant="dropdown" innerButtonComponent="Login" />
        </div>
      )}
    </Box>
  );
};

export default MarketDashboard;
