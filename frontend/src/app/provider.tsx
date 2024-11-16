"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

import { CacheProvider } from "@chakra-ui/next-js";
import {  ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/wagmi";

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const queryClient = new QueryClient();

  const appInfo = {
    appName: "NextJs",
  };

  console.log(process.env.NEXT_PUBLIC_DYNAMIC_ID, 'NEXT_PUBLIC_DYNAMIC_ID')
  return (
    <ThemeProvider>
      <DynamicContextProvider
    settings={{
      environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID || "",
      walletConnectors: [ EthereumWalletConnectors ],
    }}>
    
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider>
            <ChakraProvider>
              <RainbowKitProvider coolMode appInfo={appInfo}>
              
                {mounted && children}
                
              </RainbowKitProvider>
            </ChakraProvider>
          </CacheProvider>
        </QueryClientProvider>
      </WagmiProvider>
      </DynamicContextProvider>
    </ThemeProvider>
  );
}

export default AppProvider;
