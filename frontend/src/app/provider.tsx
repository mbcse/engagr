"use client";
import React, { useEffect, useState } from "react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@/context/ThemeContext";

import { CacheProvider } from "@chakra-ui/next-js";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/wagmi";

import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

// const emotionCache = createCache({
//   key: "emotion-css-cache",
//   prepend: true,
// });

function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const queryClient = new QueryClient();

  // const theme = extendTheme({
  //   initialColorMode: "dark",
  //   useSystemColorMode: true,
  // });

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
              <DynamicWidget />
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
