import express from 'express'
import { nanoid } from 'nanoid'

import ShortUrl from '../../database/shortUrls.js'
import config from '../../config/index.js'
const router = express.Router()

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body
  console.log('originalUrl', originalUrl)
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' })
  }

  const shortId = nanoid(8) // Generate a unique 8-character ID
  const shortUrl = `${config.DEPLOY_URL}/${shortId}`
  const newShortUrl = new ShortUrl({ shortUrl, originalUrl })
  await newShortUrl.save()
  res.json({ shortUrl })
})

// Endpoint to redirect to the original URL
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params
  const shortUrl = `${config.DEPLOY_URL}/${shortId}`
  const shortUrlData = await ShortUrl.findOne({ shortUrl })
  const originalUrl = shortUrlData.originalUrl
  if (!originalUrl) {
    return res.status(404).json({ error: 'URL not found' })
  }

  res.redirect(originalUrl)
})
export default router
