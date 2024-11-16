import express from 'express'
import { getUserAccessToken } from '../../controllers/githubController/auth'
const router = express.Router()

router.get('/accesstoken', getUserAccessToken)

export default router
