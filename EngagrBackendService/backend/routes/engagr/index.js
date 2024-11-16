import express from 'express'
import { getOrRegisterMarketer, getOrRegisterPromoter, publishAd } from '../../controllers/engagr'
const router = express.Router()

/* GET users listing. */
router.post('/get-register-marketer', getOrRegisterMarketer)
router.post('/get-register-promoter', getOrRegisterPromoter)
router.post('/register-ad', publishAd)
export default router
