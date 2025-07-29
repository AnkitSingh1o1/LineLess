import { Router } from 'express';
import { RegisterController } from './controllers/registerController';

const router = Router();

const registerController = new RegisterController();

//Register
router.post('/auth/register', (req, res) => registerController.register(req, res));

//Login
router.post('/auth/login', (req, res) =>  registerController.login(req, res));

//Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

export default router;
