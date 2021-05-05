import express from 'express'
import { check } from 'express-validator'
import {getTokenFromRequest} from '../middleware/authMiddleware.js'
import {getUsers, login, register, getUserByToken, updateUserProfile} from '../controllers/userController.js'
const router = express.Router()


router.route('/').get( getUsers)
router.route('/login').post(login)
router.route('/user').get(getTokenFromRequest, getUserByToken)
router.route('/').post([
    check('password', 'Enter password with 6 and more characters').isLength({min: 6}),
    check('email', 'Email must be email!').isEmail()
], register)
router.route('/:id').put(getTokenFromRequest, updateUserProfile)


export default router