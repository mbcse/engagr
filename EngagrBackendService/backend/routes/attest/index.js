import express from 'express'
import { nanoid } from 'nanoid'

import ShortUrl from '../../database/shortUrls.js'
import Ad from '../../database/ads.js'
import config from '../../config/index.js'

import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router()
<<<<<<< Updated upstream
=======

const { nanoid } = require('nanoid')
>>>>>>> Stashed changes

const privateKey = process.env.PRIVATE_KEY;

const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.polygonAmoy,
  account: privateKeyToAccount(privateKey),
});


const createLinkedAttestation = async (linkedAttestationId, adId, marketer, promoters_username, prevClickValue, currentClickValue ) => {
  const attestationDataSchemaA1 = {
    schemaId: "0xa1",
    linkedAttestationId, // Linking
    data: {
      ad_id: adId,
      timestamp: Math.floor(Date.now() / 1000),
      previous_attested_click_value: prevClickValue,
      current_attested_click_value: currentClickValue,
      marketer: marketer,
      promoters_username: promoters_username,
    },
    indexingValue: `campaign_attest_ad_${nanoid()}`, // indexing
  };

  try {
    const createAttestationRes = await client.createAttestation(
      attestationDataSchemaA1
    );
    console.log("Linked attestation created:", createAttestationRes);
  } catch (error) {
    console.error("Error creating linked attestation:", error);
  }
};



router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body
  console.log('originalUrl', originalUrl)
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' })
  }

  const shortId = nanoid(8) // Generate a unique 8-character ID
  const shortUrl = `${config.DEPLOY_URL}/engagr/attest/${shortId}`
  const newShortUrl = new ShortUrl({ shortUrl, originalUrl })
  await newShortUrl.save()
  res.json({ shortUrl })
})

// Endpoint to redirect to the original URL
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params
  const shortUrl = `${config.DEPLOY_URL}/engagr/attest/${shortId}`
  const shortUrlData = await ShortUrl.findOne({ shortUrl })
  const originalUrl = shortUrlData.originalUrl
  shortUrlData.currentValue = shortUrlData.currentValue + 1;
  const adData = await Ad.findOne({ shortUrl: shortUrl })

  const attestation = await createLinkedAttestation(adData.attestationId, adData._id, adData.marketer, adData.promoters, shortUrlData.currentValue-1, shortUrlData.currentValue);

  shortUrlData.attestationId = attestation.id;
  await shortUrlData.save();

  if (!originalUrl) {
    return res.status(404).json({ error: 'URL not found' })
  }

  res.redirect(originalUrl)
})
export default router
