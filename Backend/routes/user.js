import express from 'express'
import { Login, Logout, SignUp, getMyProfile } from '../Controllers/user.js';


const router = express.Router();

router.post('/signup',SignUp);
router.post('/login',Login);
router.get('/logout',Logout);
router.get('/me',getMyProfile);


export default router;
