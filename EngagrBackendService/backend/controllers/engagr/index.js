import Marketer from '../../database/marketer.js'

import Promoter from '../../database/promoter.js' // Adjust the path as per your project structure
import { getUserInfoByUsername } from '../twitter/helpers'

import Ad from '../../database/ads.js'

export const getOrRegisterMarketer = async (req, res) => {
  try {
    const { accountAddress, email } = req.body

    // Validate input
    if (!accountAddress || !email) {
      return res.status(400).json({ error: 'accountAddress and email are required.' })
    }

    // Check if marketer exists
    let marketer = await Marketer.findOne({ accountAddress, email })

    if (marketer) {
      // If marketer exists, return their ID
      return res.status(200).json({ userId: marketer._id })
    }

    // If marketer does not exist, create a new one
    marketer = new Marketer({ accountAddress, email })
    await marketer.save()

    // Return the new marketer's ID
    return res.status(201).json({ userId: marketer._id })
  } catch (error) {
    console.error('Error in getOrRegisterMarketer:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
} // Adjust the path as per your project structure

export const getOrRegisterPromoter = async (req, res) => {
  try {
    const { twitterUsername, accountAddress } = req.body

    // Validate input
    if (!twitterUsername || !accountAddress) {
      return res.status(400).json({ error: 'twitterUsername and accountAddress are required.' })
    }

    // Check if promoter exists
    let promoter = await Promoter.findOne({ twitterUsername, accountAddres: accountAddress })

    if (promoter) {
      // If promoter exists, return their ID
      return res.status(200).json({ userId: promoter._id })
    }

    const promoterTwitterData = await getUserInfoByUsername(twitterUsername)

    const { followers_count } = promoterTwitterData.data.public_metrics

    // If promoter does not exist, create a new one
    promoter = new Promoter({
      twitterUsername,
      accountAddres: accountAddress,
      followers: followers_count || 0,
      twitterData: promoterTwitterData.data || {}
    })
    await promoter.save()

    // Return the new promoter's ID
    return res.status(201).json({ userId: promoter._id })
  } catch (error) {
    console.error('Error in getOrRegisterPromoter:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
} // Adjust path to your Ad model

export const publishAd = async (req, res) => {
  try {
    const {
      adDescription,
      amountAllocated,
      chainId,
      endtimestamp,
      media,
      requiredFollowers,
      marketer
    } = req.body

    // Input Validation
    if (!adDescription || !amountAllocated || !chainId || !endtimestamp || !media || !requiredFollowers || !marketer) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    // Check if endtimestamp is in the future
    const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
    if (endtimestamp <= currentTime) {
      return res.status(400).json({ error: 'endtimestamp must be in the future.' })
    }

    // Create a new Ad
    const newAd = new Ad({
      adDescription,
      amountAllocated,
      chainId,
      endtimestamp,
      media,
      requiredFollowers,
      marketer
    })

    // Save Ad to database
    await newAd.save()

    // Return saved Ad details
    return res.status(201).json({ ad: newAd })
  } catch (error) {
    console.error('Error in publishAd:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}
