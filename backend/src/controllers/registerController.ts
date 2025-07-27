import { Request, Response } from 'express';
import { RegisterService } from '../services/registerService';
import { RegisterRequest } from '../types/authTypes';

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
}