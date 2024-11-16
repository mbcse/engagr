import Marketer from '../../database/marketer.js'

import Promoter from '../../database/promoter.js' // Adjust the path as per your project structure
import { fetchAndCheckUserTweetsAndPushAds, getUserInfoByUsername } from '../twitter/helpers'

import Ad from '../../database/ads.js'

setInterval(() => {
  console.log('Running every 3 minutes')

  // Fetch all active ads
  Ad.find({ endtimestamp: { $gte: Math.floor(Date.now() / 1000) } }, async (err, ads) => {
    if (err) {
      console.error('Error fetching ads:', err)
      return
    }

    // Loop through each ad
    for (const ad of ads) {
      // Fetch all promoters with followers greater than or equal to the required followers
      const promoters = await Promoter.find({ followers: { $gte: ad.requiredFollowers } })

      // Loop through each promoter
      for (const promoter of promoters) {
        // Check if the promoter has already promoted the ad
        const existingPromotion = promoter.promotedAds.find((p) => p.toString() === ad._id.toString())
        if (!existingPromotion) {
          // Add the ad to the promoter's promotedAds
          await fetchAndCheckUserTweetsAndPushAds(promoter.twitterId, ad.adDescription, ad.media, ad._id)
          promoter.promotedAds.push(ad._id)
          await promoter.save()
        }
      }
    }
  })
}, 180000)

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
    const twitterId = promoterTwitterData.data.id

    // If promoter does not exist, create a new one
    promoter = new Promoter({
      twitterId,
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
      marketer,
      objective
    } = req.body

    console.log(req.body, 'req.body')

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
      marketer,
      objective
    })

    // Save Ad to database
    await newAd.save()

    const marketerData = await Marketer.findOne({ _id: marketer })
    marketerData.adsPublished.push(newAd._id)
    await marketerData.save()

    // Return saved Ad details
    return res.status(201).json({ ad: newAd })
  } catch (error) {
    console.error('Error in publishAd:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}