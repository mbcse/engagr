import express from 'express'
// import dataRoute from './data'
import engagrRoute from './engagr'
// import verifyAPIKey from '../middleware/verifyAPIKey.js'

const router = express.Router()

// landing page
router.get('/', (req, res) => {
  res.send('Welcome to Backend!')
})

router.get('/hello', (req, res) => {
  res.send('Welcome to Backend!')
})

router.get('/engagr', engagrRoute)

export default router
