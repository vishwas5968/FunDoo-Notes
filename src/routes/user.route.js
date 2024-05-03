import express from 'express';
import * as userController from '../controllers/user.controller';
import {loginValidator, newUserValidator} from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator , userController.registerUser)

router.post('/login', loginValidator, userController.login)

router.post('/forgot-password', userController.forgotPassword)

router.post('/reset-password',userAuth, userController.resetPassword)

export default router