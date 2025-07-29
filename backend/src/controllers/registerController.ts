import { Request, Response } from 'express';
import { RegisterService } from '../services/registerService';
import { LoginRequest, RegisterRequest } from '../types/authTypes';

export class RegisterController {
    private readonly registerService: RegisterService;
    constructor(){
        this.registerService = new RegisterService();
    }
    async register(req: Request, res: Response): Promise<void>{
        try{
            const { username, email, password } = req.body as RegisterRequest;
            if(!username || !email || !password){
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }
            const result = await this.registerService.register({username, email, password});
            res.status(201).json({
                message: 'User registered successfully',
                token: result.token
            });
        }catch(error){
            if(error instanceof Error){
                res.status(400).json({ error: error.message });
            }else{
                res.status(500).json({ error: 'Internal server error'});
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        console.log('Login request body:', req.body);
        if (!req.body) {
        res.status(400).json({ error: 'Request body is missing' });
        return;
        }
        try {
        const { email, password } = req.body as LoginRequest;

        if (!email || !password) {
            res.status(400).json({ error: 'Missing email or password' });
            return;
        }

        const result = await this.registerService.login({ email, password });
        res.status(200).json({
            message: 'Login successful',
            token: result.token
        });
        } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
        }
    }
}