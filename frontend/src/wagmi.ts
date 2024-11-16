"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Transport } from "viem";
import { createConfig, http } from "wagmi";
import {

  base,
  polygonAmoy

} from "wagmi/chains";

import linea_logo from "../public/img/linea_logo.png";
import lineaTesnet_logo from "../public/img/lineaTesnet_logo.png";
import zksync_logo from "../public/img/zksync_logo.svg";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "bjwbxjwb";

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "Next-Web3-Boilerplate", projectId: walletConnectProjectId },
);

// Fix missing icons

const transports: Record<number, Transport> = {
  
  [base.id]: http(),
  [polygonAmoy.id]: http(),
};
export const wagmiConfig = createConfig({
  chains: [
    base,
    polygonAmoy
  ],
  connectors,
  transports,
  ssr: true,
});
