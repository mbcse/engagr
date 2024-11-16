import { type Config, getConnectorClient } from '@wagmi/core'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import type { Account, Chain, Client, Transport } from 'viem'

import { wagmiConfig } from '@/wagmi'

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  console.log('client', client)
  const { account, chain, transport } = client
  console.log('0', account, chain, transport)
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  console.log('network', network)

  const provider = new BrowserProvider(transport, network)
  console.log('1')
  const signer = new JsonRpcSigner(provider, account.address)
  console.log('2')
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(
  config: Config,
  { chainId }: { chainId?: number } = {},
) {
  try {
    const client = await getConnectorClient(config, { chainId })
    return clientToSigner(client)
  } catch (error) {
    console.error('Error getting ethers signer:', error)
    throw error
  }
}

export async function getDefaultEthersSigner() {
    const signer = await getEthersSigner(wagmiConfig)
    return signer
}