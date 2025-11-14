import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.post('/register', userController.singin)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

export default router