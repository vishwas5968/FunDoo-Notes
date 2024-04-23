import express from 'express';
import * as userController from '../controllers/user.controller';
import {loginValidator, newUserValidator} from '../validators/user.validator';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator , userController.registerUser);

router.post('/login', loginValidator ,userController.login)

export default router;