import { Router }from 'express';
import {
    login, 
    register,
    getAll
} from '../controllers/user.controller.js'

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/getAll', getAll);

export default router;